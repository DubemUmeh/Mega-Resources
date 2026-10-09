import "server-only";
import { headers } from "next/headers";

type FormSecurityInput = {
  token?: string;
  honeypot?: string;
  formStartedAt?: number;
};

type VerificationResult = { success: true } | { success: false; message: string };

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;

export async function verifyPublicForm(
  input: FormSecurityInput,
  expectedAction: string,
): Promise<VerificationResult> {
  if (typeof input.honeypot === "string" && input.honeypot.trim()) {
    return { success: false, message: "Invalid submission." };
  }

  const startedAt = Number(input.formStartedAt);
  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    return { success: false, message: "Please reload the form and try again." };
  }
  const elapsed = Date.now() - startedAt;
  // Allow a small clock-skew margin, but reject implausibly fast submissions.
  if (elapsed < 3_000 || elapsed > 24 * 60 * 60 * 1_000) {
    return { success: false, message: "Please take a moment to review the form and try again." };
  }

  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = requestHeaders.get("cf-connecting-ip")?.trim() || forwardedFor || requestHeaders.get("x-real-ip")?.trim();
  if (!ip) return { success: false, message: "Unable to verify this request. Please try again." };

  const now = Date.now();
  const tracker = attempts.get(ip);
  if (!tracker || now >= tracker.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else if (tracker.count >= MAX_ATTEMPTS) {
    return { success: false, message: "Too many submissions. Please wait a minute and try again." };
  } else {
    tracker.count += 1;
  }

  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) {
    console.error("TURNSTILE_SECRET is not configured.");
    return { success: false, message: "Security verification is temporarily unavailable." };
  }
  if (!input.token || typeof input.token !== "string" || input.token.length > 2048) {
    return { success: false, message: "Please complete the security check and try again." };
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: input.token, remoteip: ip }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Siteverify returned ${response.status}`);
    const result = await response.json() as {
      success?: boolean;
      action?: string;
      hostname?: string;
    };
    const expectedHostnames = (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
    if (
      result.success !== true ||
      result.action !== expectedAction ||
      !result.hostname ||
      !expectedHostnames.includes(result.hostname.toLowerCase())
    ) {
      return { success: false, message: "Security verification failed. Please try again." };
    }
    return { success: true };
  } catch (error) {
    console.error("Turnstile verification failed:", error);
    return { success: false, message: "Security verification is temporarily unavailable." };
  }
}

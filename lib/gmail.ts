import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { gmailMessageMetadata, googleOAuthTokens } from "@/db/schema";
import { decryptSecret, encryptSecret, refreshGoogleAccessToken } from "@/lib/google-oauth";

import type { GmailListItem } from "@/lib/gmail-client";

export async function getGoogleConnection(adminId: string) {
  const [token] = await db.select().from(googleOAuthTokens).where(eq(googleOAuthTokens.adminId, adminId)).limit(1);
  return token ?? null;
}

export async function getValidAccessToken(adminId: string) {
  const token = await getGoogleConnection(adminId);
  if (!token || token.revokedAt) return null;
  if (token.expiresAt.getTime() > Date.now() + 60_000) return decryptSecret(token.accessToken);
  if (!token.refreshToken) return null;
  try {
    const refreshed = await refreshGoogleAccessToken(decryptSecret(token.refreshToken));
    const encrypted = encryptSecret(refreshed.access_token);
    await db.update(googleOAuthTokens).set({ accessToken: encrypted, expiresAt: new Date(Date.now() + refreshed.expires_in * 1000), updatedAt: new Date(), revokedAt: null }).where(eq(googleOAuthTokens.adminId, adminId));
    return refreshed.access_token;
  } catch {
    await db.update(googleOAuthTokens).set({ revokedAt: new Date(), updatedAt: new Date() }).where(eq(googleOAuthTokens.adminId, adminId));
    return null;
  }
}

export async function fetchGmailMessages(adminId: string, query: string, maxResults = 10) {
  const accessToken = await getValidAccessToken(adminId);
  if (!accessToken) return { status: "disconnected" as const, messages: [] as GmailListItem[] };
  const list = await gmailFetch<{ messages?: { id: string; threadId: string }[] }>(accessToken, `/gmail/v1/users/me/messages?q=${encodeURIComponent(query)}&maxResults=${maxResults}`);
  const ids = list.messages ?? [];
  const messages = await Promise.all(ids.map(async (item) => {
    const detail = await gmailFetch<GmailMessage>(accessToken, `/gmail/v1/users/me/messages/${item.id}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`);
    const headers = detail.payload?.headers ?? [];
    const from = header(headers, "From");
    const parsed = parseFrom(from);
    const [metadata] = await db.select().from(gmailMessageMetadata).where(eq(gmailMessageMetadata.gmailMessageId, detail.id)).limit(1);
    return {
      id: detail.id,
      threadId: detail.threadId,
      fromName: parsed.name,
      fromEmail: parsed.email,
      subject: header(headers, "Subject") || "(No subject)",
      date: header(headers, "Date"),
      preview: detail.snippet ?? "",
      unread: (detail.labelIds ?? []).includes("UNREAD"),
      handled: metadata?.handled ?? false,
    };
  }));
  return { status: "connected" as const, messages };
}

export async function fetchGmailMessage(adminId: string, messageId: string) {
  const accessToken = await getValidAccessToken(adminId);
  if (!accessToken) return null;
  const detail = await gmailFetch<GmailMessage>(accessToken, `/gmail/v1/users/me/messages/${messageId}?format=full`);
  const headers = detail.payload?.headers ?? [];
  const parsed = parseFrom(header(headers, "From"));
  return { id: detail.id, threadId: detail.threadId, fromName: parsed.name, fromEmail: parsed.email, subject: header(headers, "Subject") || "(No subject)", date: header(headers, "Date"), preview: detail.snippet ?? "", unread: (detail.labelIds ?? []).includes("UNREAD") };
}

async function gmailFetch<T>(accessToken: string, path: string) {
  const response = await fetch(`https://gmail.googleapis.com${path}`, { headers: { authorization: `Bearer ${accessToken}` }, cache: "no-store" });
  if (!response.ok) throw new Error("Gmail API request failed");
  return (await response.json()) as T;
}

function header(headers: { name: string; value: string }[], name: string) {
  return headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value ?? "";
}
function parseFrom(value: string) {
  const match = value.match(/^(.*)<(.+)>$/);
  if (!match) return { name: value.split("@")[0] ?? "", email: value };
  return { name: match[1].replace(/\"/g, "").trim(), email: match[2].trim() };
}

type GmailMessage = { id: string; threadId: string; labelIds?: string[]; snippet?: string; payload?: { headers?: { name: string; value: string }[] } };

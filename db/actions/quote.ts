"use server";

import { db } from "@/db/db";
import { quoteRequests } from "@/db/schema";
import { quoteSchema } from "@/db/validation-schema";
import { createEmailTransporter } from "@/lib/email";
import { generateQuoteEmail } from "@/lib/email";
import type { ActionResult } from "@/db/action-types";

export async function submitQuoteRequest(input: {
  name: string;
  phone: string;
  email?: string;
  region: string;
  services: string[];
  propertyType: string;
  contactMethod: string;
  message?: string;
  consent: boolean;
}): Promise<ActionResult> {
  const parsed = quoteSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await db.insert(quoteRequests).values(parsed.data);
  } catch (err) {
    console.error("Quote request DB insert failed:", err);
    return {
      success: false,
      message: "Something went wrong saving your request. Please try again.",
      errors: {},
    };
  }

  try {
    if (process.env.BREVO_SMTP_USER && process.env.BREVO_SMTP_PASSWORD) {
      const transporter = createEmailTransporter();
      await transporter.sendMail(generateQuoteEmail(parsed.data));
    }
  } catch (err) {
    console.error(
      "Quote notification email failed (request was still saved):",
      err,
    );
  }

  return {
    success: true,
    message:
      "Request received — we'll reach out within 24 hours to schedule your free survey.",
  };
}

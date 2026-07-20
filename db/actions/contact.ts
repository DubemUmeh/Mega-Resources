"use server";

import { db } from "@/db/db";
import { contactSubmissions } from "@/db/schema";
import { contactSchema } from "@/db/validation-schema";
import { createEmailTransporter, generateContactEmail } from "@/lib/email";
import type { ActionResult } from "@/db/action-types";

export async function submitContactForm(input: {
  name: string;
  email: string;
  phone: string;
  location?: string;
  services?: string[];
  message: string;
}): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await db.insert(contactSubmissions).values(parsed.data);
  } catch (err) {
    console.error("Contact submission DB insert failed:", err);
    return {
      success: false,
      message: "Something went wrong saving your message. Please try again.",
      errors: {},
    };
  }

  // Email is best-effort — the submission is already saved either way.
  try {
    if (process.env.BREVO_SMTP_USER && process.env.BREVO_SMTP_PASSWORD) {
      const transporter = createEmailTransporter();
      await transporter.sendMail(generateContactEmail(parsed.data));
    }
  } catch (err) {
    console.error(
      "Contact notification email failed (message was still saved):",
      err,
    );
  }

  return {
    success: true,
    message: "Message sent — we'll get back to you within 24 hours.",
  };
}

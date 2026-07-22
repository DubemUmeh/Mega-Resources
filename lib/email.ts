import nodemailer from "nodemailer";
import { MEGA_LOGO_EMAIL_SVG } from "@/components/logo";

export const emailConfig = {
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // false for port 587 (STARTTLS), true for port 465
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASSWORD,
  },
  debugger: true,
};

// Create reusable transporter
export const createEmailTransporter = () => {
  return nodemailer.createTransport(emailConfig);
};

const brandLogo = MEGA_LOGO_EMAIL_SVG;

const emailShell = (
  title: string,
  fields: { label: string; value: string }[],
  footerNote: string,
) => `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body { font-family: Arial, Helvetica, sans-serif; background: #f4f7fb; color: #1f2937; padding: 40px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 18px; padding: 30px; box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08); }
        .brand { text-align: center; margin-bottom: 24px; }
        .brand-logo { margin: 0 auto; }
        .header { border-bottom: 2px solid #b1814d; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { margin: 0; color: #262c37; font-size: 24px; letter-spacing: 2px; }
        .field { margin-bottom: 20px; }
        .label { color: #a3a3a3; font-size: 12px; letter-spacing: 1px; margin-bottom: 5px; }
        .value { font-size: 16px; line-height: 1.6; }
        .message-box { background: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; margin-top: 20px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #737373; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="brand">${brandLogo}</div>
        <div class="header"><h1>${title}</h1></div>
        ${fields
          .map(
            (f) => `
          <div class="field">
            <div class="label">${f.label.toUpperCase()}</div>
            <div class="value">${f.value}</div>
          </div>`,
          )
          .join("")}
        <div class="footer">${footerNote}</div>
      </div>
    </body>
  </html>
`;

export const generateQuoteEmail = (data: {
  name: string;
  phone: string;
  email?: string;
  region: string;
  services: string[];
  propertyType: string;
  contactMethod: string;
  message?: string;
}) => {
  const fields = [
    { label: "Name", value: data.name },
    { label: "Phone", value: data.phone },
    { label: "Email", value: data.email || "—" },
    { label: "Region", value: data.region },
    { label: "Services Requested", value: data.services.join(", ") },
    { label: "Property Type", value: data.propertyType },
    { label: "Preferred Contact", value: data.contactMethod },
  ];

  return {
    from: '"Mega Resources Quote Request" <info@umeh.site>',
    to: "info@umeh.site",
    replyTo: data.email || undefined,
    subject: `New Quote Request — ${data.name} (${data.region})`,
    html: emailShell(
      "NEW QUOTE REQUEST",
      data.message
        ? [
            ...fields,
            { label: "Notes", value: data.message.replace(/\n/g, "<br>") },
          ]
        : fields,
      `Submitted at ${new Date().toLocaleString()}`,
    ),
    text: `NEW QUOTE REQUEST
      ==================
      Name: ${data.name}
      Phone: ${data.phone}
      Email: ${data.email || "—"}
      Region: ${data.region}
      Services: ${data.services.join(", ")}
      Property Type: ${data.propertyType}
      Preferred Contact: ${data.contactMethod}
      ${data.message ? `\nNotes:\n${data.message}` : ""}

      Submitted at ${new Date().toLocaleString()}
    `,
  };
};

export const generateReviewPendingNotification = (data: {
  name: string;
  location: string;
  services: string[];
  rating: number;
}) => {
  const fields = [
    { label: "Name", value: data.name },
    { label: "Location", value: data.location },
    { label: "Services", value: data.services.join(", ") },
    { label: "Rating", value: `${data.rating} / 5` },
  ];

  return {
    from: '"Mega Resources Reviews" <info@umeh.site>',
    to: "info@umeh.site",
    subject: `New Review Pending Approval — ${data.name}`,
    html: emailShell(
      "NEW REVIEW — AWAITING APPROVAL",
      fields,
      `Review this in the admin dashboard before it appears publicly. Submitted at ${new Date().toLocaleString()}`,
    ),
    text: `NEW REVIEW — AWAITING APPROVAL
      Name: ${data.name}
      Location: ${data.location}
      Services: ${data.services.join(", ")}
      Rating: ${data.rating} / 5

      Review this in the admin dashboard before it appears publicly.
      Submitted at ${new Date().toLocaleString()}
    `,
  };
};

export const generateContactEmail = (data: {
  name: string;
  email: string;
  phone: string;
  location?: string;
  services?: string[];
  message: string;
}) => {
  const fields = [
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    { label: "Phone", value: data.phone },
    { label: "Location", value: data.location || "—" },
    {
      label: "Services",
      value:
        data.services && data.services.length > 0
          ? data.services.join(", ")
          : "General Inquiry",
    },
    {
      label: "Message",
      value: data.message.replace(/\n/g, "<br>"),
    },
  ];

  return {
    from: '"Mega Resources Contact Form" <info@umeh.site>',
    to: "info@umeh.site",
    replyTo: data.email,
    subject: `New Contact Message — ${data.name}`,
    html: emailShell(
      "NEW CONTACT MESSAGE",
      fields,
      `Submitted at ${new Date().toLocaleString()}`,
    ),
    text: `NEW CONTACT MESSAGE
      ====================
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      Location: ${data.location || "—"}
      Services: ${
        data.services?.length ? data.services.join(", ") : "General Inquiry"
      }

      Message: ${data.message}
      Submitted at ${new Date().toLocaleString()}
    `,
  };
};

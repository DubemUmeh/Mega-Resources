import LegalPageLayout, {
  type LegalSection,
} from "@/components/legal-page-layout";

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "1. Overview",
    body: (
      <>
        <p>
          This Privacy Policy explains how [Company Name] (&quot;we,&quot;
          &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects
          personal information when you visit our website, request a
          quote, submit a review, or otherwise contact us. By using this
          website, you agree to the practices described in this policy.
        </p>
        <p className="mt-4">
          We are a borehole drilling and water solutions company operating
          in Ghana. This policy is written with Ghana&apos;s Data
          Protection Act, 2012 (Act 843) in mind, and, where relevant to
          visitors from outside Ghana, general principles found in
          regulations such as the EU/UK GDPR.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    body: (
      <>
        <p>We collect information in the following ways:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <span className="font-medium text-foreground">
              Contact and quote request forms:
            </span>{" "}
            name, phone number, email address, property location, and
            details about the service you&apos;re enquiring about.
          </li>
          <li>
            <span className="font-medium text-foreground">
              Reviews and feedback submissions:
            </span>{" "}
            your name (or the name/initials you choose to display), your
            review text, a rating, and any photos you choose to attach.
          </li>
          <li>
            <span className="font-medium text-foreground">
              Uploaded files:
            </span>{" "}
            any photos or documents you voluntarily attach to a form (for
            example, a photo of your land or an existing borehole).
          </li>
          <li>
            <span className="font-medium text-foreground">
              Technical information:
            </span>{" "}
            IP address, browser type, device information, and general
            usage data, collected automatically if we use analytics tools
            such as Google Analytics.
          </li>
          <li>
            <span className="font-medium text-foreground">Cookies:</span>{" "}
            small files used for basic site functionality and, where
            enabled, analytics. See Section 6 for details.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "3. How We Use Your Information",
    body: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Respond to quote requests and enquiries.</li>
          <li>Schedule site visits, surveys, and drilling work.</li>
          <li>
            Publish reviews and testimonials on our website, with your
            consent.
          </li>
          <li>
            Improve our website and services based on how visitors use the
            site.
          </li>
          <li>
            Communicate updates about a project you&apos;ve enquired about
            or booked.
          </li>
          <li>Comply with legal and regulatory obligations.</li>
        </ul>
        <p className="mt-4">
          We do not sell your personal information to third parties.
        </p>
      </>
    ),
  },
  {
    id: "reviews-testimonials",
    title: "4. Public Reviews & Testimonials",
    body: (
      <>
        <p>
          If you submit a review or testimonial, it may be displayed
          publicly on our website. Before publishing, we ask you to
          confirm consent via a checkbox on the submission form (for
          example: &quot;I consent to my review, name, and any
          accompanying photos being published on the company&apos;s
          website&quot;).
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            You may choose how your name appears — in full, abbreviated
            (e.g. &quot;John D.&quot;), or anonymously.
          </li>
          <li>
            You may request that we edit or remove your review at any
            time by contacting us using the details in Section 8.
          </li>
          <li>
            We reserve the right not to publish, or to remove, reviews
            that are false, abusive, or otherwise inappropriate.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies-analytics",
    title: "5. Cookies & Analytics",
    body: (
      <>
        <p>
          Our website may use cookies and similar technologies for basic
          functionality and, where enabled, to understand how visitors use
          the site (for example, via Google Analytics). Analytics data is
          generally aggregated and does not directly identify you.
        </p>
        <p className="mt-4">
          You can control or disable cookies through your browser
          settings. Disabling cookies may affect how some parts of the
          site function.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "6. Data Retention",
    body: (
      <p>
        We retain personal information only for as long as necessary to
        fulfil the purposes described in this policy — for example, for
        the duration of a project plus a reasonable period afterward for
        warranty and record-keeping purposes — unless a longer retention
        period is required by law. Published reviews remain on the site
        until you request removal or until we determine removal is
        appropriate.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "7. Your Rights",
    body: (
      <>
        <p>Depending on your location, you may have the right to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Request access to the personal information we hold about you.</li>
          <li>Request correction of inaccurate information.</li>
          <li>
            Request deletion of your information, including a published
            review.
          </li>
          <li>Withdraw consent for us to display your review publicly.</li>
          <li>
            Object to certain uses of your information, such as
            analytics.
          </li>
        </ul>
        <p className="mt-4">
          To exercise any of these rights, contact us using the details in
          Section 8. We will respond within a reasonable timeframe and in
          line with applicable law, including Ghana&apos;s Data Protection
          Act, 2012 (Act 843).
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "8. Data Security",
    body: (
      <p>
        We take reasonable technical and organisational measures to
        protect personal information from unauthorised access, loss, or
        misuse. However, no method of transmission or storage is
        completely secure, and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "changes",
    title: "9. Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time to reflect
        changes in our practices or for legal, operational, or regulatory
        reasons. The &quot;Last updated&quot; date at the top of this page
        reflects the most recent revision. We encourage you to review this
        page periodically.
      </p>
    ),
  },
  {
    id: "contact",
    title: "10. Contact Us",
    body: (
      <p>
        If you have questions about this Privacy Policy, or wish to
        access, correct, or delete your information, please contact us at{" "}
        <a
          href="mailto:info@yourcompany.com"
          className="font-medium text-blue-600 underline underline-offset-2"
        >
          info@yourcompany.com
        </a>{" "}
        or through our{" "}
        <a
          href="/contact"
          className="font-medium text-blue-600 underline underline-offset-2"
        >
          contact page
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This page explains what personal information we collect, why we collect it, and how you can control it — including anything you submit through our contact forms or public reviews."
      lastUpdated="July 12, 2026"
      sections={sections}
    />
  );
}

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
          This Privacy Policy explains how Mega Resources ("we," "us,"
          or "our") collects, uses, stores, and protects personal
          information when you visit our website, request a quote,
          submit a review, contact us, or use our administrative
          services. By using this website, you acknowledge the practices
          described in this policy, subject to your rights under
          applicable law.
        </p>
        <p className="mt-4">
          Mega Resources is a groundwater, drilling, monitoring, and
          water solutions company operating in Ghana. This policy takes
          Ghana&apos;s Data Protection Act, 2012 (Act 843) into account
          and describes relevant privacy practices for visitors from
          other jurisdictions where applicable.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    body: (
      <>
        <p>
          The information we collect depends on how you interact with
          our website and services. It may include:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <span className="font-medium text-foreground">
              Contact and quote requests:
            </span>{" "}
            your name, telephone number, email address, property or
            project location, and details about the service you
            request.
          </li>
          <li>
            <span className="font-medium text-foreground">
              Reviews and feedback:
            </span>{" "}
            your chosen display name, review text, rating, and any
            photographs you voluntarily submit.
          </li>
          <li>
            <span className="font-medium text-foreground">
              Uploaded files:
            </span>{" "}
            photographs, documents, or other files you choose to attach
            to forms, such as images of your property or an existing
            borehole.
          </li>
          <li>
            <span className="font-medium text-foreground">
              Technical information:
            </span>{" "}
            information such as IP address, browser type, device
            information, access logs, and usage information, where
            collected by our hosting infrastructure, security tools,
            or analytics services.
          </li>
          <li>
            <span className="font-medium text-foreground">
              Cookies and similar technologies:
            </span>{" "}
            information stored or accessed through cookies and similar
            technologies used for website functionality, authentication,
            security, and analytics where enabled.
          </li>
          <li>
            <span className="font-medium text-foreground">
              Administrator authentication information:
            </span>{" "}
            information processed when authorized administrators sign
            in through Google OAuth, as described in Section 4.
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
        <p>We may use collected information to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Respond to enquiries and quote requests.</li>
          <li>
            Arrange site visits, surveys, drilling work, and related
            services.
          </li>
          <li>
            Publish reviews and testimonials where the necessary
            consent has been obtained.
          </li>
          <li>
            Communicate with customers about projects, bookings, and
            requested services.
          </li>
          <li>
            Maintain website functionality, troubleshoot errors, and
            protect our website and administrative systems.
          </li>
          <li>
            Authenticate authorized administrators and provide
            protected administrative features.
          </li>
          <li>
            Improve our services and website where appropriate.
          </li>
          <li>
            Comply with legal obligations and respond to legitimate
            requests from competent authorities.
          </li>
        </ul>
        <p className="mt-4">
          We do not sell personal information to third parties.
          Information is used for the purposes described in this policy
          or other purposes disclosed to you where required by law.
        </p>
      </>
    ),
  },
  {
    id: "google-oauth",
    title: "4. Google OAuth and Google API Data",
    body: (
      <>
        <p>
          Mega Resources uses a custom Google OAuth 2.0 implementation
          to authenticate authorized administrators who access protected
          administrative pages of our website. Google authentication
          is intended for administration and is not required for
          ordinary visitors to browse our public website, request a
          quote, or contact us.
        </p>

        <h3 className="mt-5 font-semibold text-foreground">
          Information Accessed
        </h3>
        <p className="mt-2">
          During Google sign-in, our application may receive basic
          Google account information, such as an administrator&apos;s
          name, email address, profile information, and account
          identifier, depending on the authentication scopes requested
          and granted.
        </p>
        <p className="mt-3">
          Where an administrator authorizes additional Gmail or other
          Google API permissions, our application may access information
          made available by those APIs within the permissions granted.
          The information accessed depends on the specific OAuth scopes
          and the administrative features implemented in our application.
          We do not assume access to information that has not been
          authorized.
        </p>

        <h3 className="mt-5 font-semibold text-foreground">
          How We Use Google User Data
        </h3>
        <p className="mt-2">
          Basic Google account information is used for administrator
          authentication, identity verification, session management,
          and access control for protected administrative pages.
        </p>
        <p className="mt-3">
          Gmail and other Google API data are used only to provide the
          specific administrative features for which the relevant
          permissions are requested and granted. Access is limited to
          the functionality and purposes disclosed to administrators
          when permission is requested. We do not use Google user data
          for targeted advertising, sell it to data brokers, or use it
          for purposes unrelated to the authorized functionality.
        </p>

        <h3 className="mt-5 font-semibold text-foreground">
          Storage and Retention
        </h3>
        <p className="mt-2">
          Depending on the features implemented, authentication
          information, session data, access tokens, refresh tokens,
          account identifiers, and information retrieved through
          Google APIs may be processed by our application and its
          supporting infrastructure.
        </p>
        <p className="mt-3">
          We retain information only for as long as necessary to
          provide the relevant functionality, maintain security,
          fulfill legitimate operational requirements, and comply
          with applicable law. The information actually stored and
          the applicable retention period depend on how each
          administrative feature operates.
        </p>

        <h3 className="mt-5 font-semibold text-foreground">
          Sharing and Disclosure
        </h3>
        <p className="mt-2">
          We do not sell Google user data or share it with third
          parties for their own advertising purposes. Google user
          data may be processed by service providers involved in
          hosting, security, authentication, and application
          operations where necessary to provide the authorized
          functionality and subject to appropriate protections.
          Information may also be disclosed where required or
          permitted by applicable law.
        </p>

        <h3 className="mt-5 font-semibold text-foreground">
          Security and Access Restrictions
        </h3>
        <p className="mt-2">
          Administrative features are intended for authorized
          administrators. We use reasonable technical and
          organizational measures to protect information processed
          through Google authentication and APIs. No security measure
          or method of electronic storage or transmission can
          guarantee absolute security.
        </p>

        <h3 className="mt-5 font-semibold text-foreground">
          Revoking Access and Requesting Deletion
        </h3>
        <p className="mt-2">
          Administrators can review or revoke the permissions granted
          to Mega Resources through their Google Account security
          settings. Revoking permission may prevent future access to
          the relevant Google APIs, but it does not necessarily delete
          information already stored by our application.
        </p>
        <p className="mt-3">
          Administrators may request access to, correction of, or
          deletion of their personal information by contacting us
          through the contact page listed in Section 11. We will
          handle requests in accordance with applicable law and
          legitimate retention requirements.
        </p>

        <h3 className="mt-5 font-semibold text-foreground">
          Google API Services User Data Policy
        </h3>
        <p className="mt-2">
          Our use and transfer of information received from Google
          APIs will comply with the Google API Services User Data
          Policy, including its Limited Use requirements where
          applicable.
        </p>
      </>
    ),
  },
  {
    id: "reviews-testimonials",
    title: "5. Public Reviews and Testimonials",
    body: (
      <>
        <p>
          If you submit a review or testimonial, it may be displayed
          publicly on our website. Where applicable, we request your
          consent before publishing your review, display name, and
          accompanying photographs.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            You may choose how your name appears, subject to the
            options available on the submission form.
          </li>
          <li>
            You may request an edit or removal of your review by
            contacting us using the details in Section 11.
          </li>
          <li>
            We may decline to publish or remove reviews that are
            fraudulent, abusive, unlawful, or otherwise inappropriate.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies-analytics",
    title: "6. Cookies and Analytics",
    body: (
      <>
        <p>
          Our website may use cookies and similar technologies to
          support essential website functionality, maintain
          authentication sessions, enhance security, and understand
          website usage where analytics tools are enabled.
        </p>
        <p className="mt-4">
          The information collected depends on the technologies
          actually enabled on our website. Where analytics services
          are used, they may collect technical and usage information
          about visits and interactions.
        </p>
        <p className="mt-4">
          You can manage or disable cookies through your browser
          settings. Disabling certain cookies may affect website
          functionality, including authentication or other features
          that depend on them.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "7. Data Retention",
    body: (
      <p>
        We retain personal information only for as long as reasonably
        necessary to fulfil the purposes described in this policy,
        meet operational requirements, resolve disputes, maintain
        appropriate records, and comply with applicable law. Retention
        periods depend on the type of information and the purpose for
        which it was collected. Published reviews may remain on the
        website until removal is requested or otherwise becomes
        appropriate, subject to applicable requirements.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "8. Your Privacy Rights",
    body: (
      <>
        <p>
          Subject to applicable law and the circumstances of the
          processing, you may have the right to:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Request access to personal information we hold about you.
          </li>
          <li>
            Request correction of inaccurate or incomplete information.
          </li>
          <li>
            Request deletion of personal information where applicable.
          </li>
          <li>
            Withdraw consent where processing is based on consent.
          </li>
          <li>
            Request removal of a published review or testimonial.
          </li>
          <li>
            Object to certain processing activities where applicable.
          </li>
          <li>
            Revoke Google API permissions previously granted to our
            application through your Google Account settings.
          </li>
        </ul>
        <p className="mt-4">
          To exercise your rights, contact us using the details in
          Section 11. We will respond in accordance with applicable
          law, including Ghana&apos;s Data Protection Act, 2012
          (Act 843).
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "9. Data Security",
    body: (
      <p>
        We take reasonable technical and organizational measures to
        protect personal information against unauthorized access,
        disclosure, alteration, loss, and misuse. These measures
        may include access restrictions, secure authentication,
        appropriate infrastructure safeguards, and other controls
        relevant to the information being processed. However, no
        method of transmission or storage is completely secure,
        and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy to reflect changes in our
        website, administrative features, data handling practices,
        or legal and regulatory requirements. The last-updated date
        displayed on this page indicates when the policy was most
        recently revised. We encourage you to review this page
        periodically.
      </p>
    ),
  },
  {
    id: "contact",
    title: "11. Contact Us",
    body: (
      <p>
        If you have questions about this Privacy Policy or wish to
        request access to, correction of, or deletion of your personal
        information, please contact Mega Resources through our{" "}
        <a
          href="/contact"
          className="font-medium text-blue-600 underline underline-offset-2"
        >
          contact page
        </a>
        . Please identify the nature of your request so we can direct
        it to the appropriate person.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      intro="Learn how Mega Resources collects, uses, stores, and protects personal information when you use our website, submit enquiries or reviews, or access authorized administrative features through Google OAuth."
      lastUpdated="October 9, 2026"
      sections={sections}
    />
  );
}

import LegalPageLayout, {
  type LegalSection,
} from "@/components/legal-page-layout";

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: (
      <p>
        By accessing or using this website, you agree to be bound by these
        Terms of Service. If you do not agree with any part of these
        terms, please do not use this website. These terms apply to all
        visitors, users, and anyone who submits a form, review, or other
        content through this site.
      </p>
    ),
  },
  {
    id: "use-of-website",
    title: "2. Use of the Website",
    body: (
      <p>
        This website is provided to give you information about our
        borehole drilling and water services, allow you to request a
        quote or site survey, and share reviews and feedback. You agree to
        use this website only for lawful purposes and in a way that does
        not infringe the rights of, or restrict the use of, this site by
        anyone else.
      </p>
    ),
  },
  {
    id: "accuracy-of-information",
    title: "3. Accuracy of Website Information & Quotes",
    body: (
      <>
        <p>
          We aim to keep the information on this website accurate and
          up to date, but we make no warranties or guarantees about the
          completeness, reliability, or accuracy of any content on this
          site.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Any pricing, timelines, or figures shown on this website are
            estimates only and do not constitute a binding offer or
            contract.
          </li>
          <li>
            A binding quote is only provided in writing after a site
            visit and survey, and is subject to the specific conditions
            found on your land.
          </li>
          <li>
            We do not guarantee that every site is suitable for drilling,
            or that a given yield or depth will be achieved, until a
            geophysical survey has been carried out.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "reviews-submissions",
    title: "4. Reviews & User Submissions",
    body: (
      <>
        <p>
          If you submit a review, testimonial, photo, or other content
          through this website, you agree that:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            The content you submit is truthful, accurate, and reflects
            your genuine experience.
          </li>
          <li>
            You grant us permission to publish, display, and reproduce
            your submission on this website and in related marketing
            materials, subject to the consent options described in our{" "}
            <a
              href="/privacy-policy"
              className="font-medium text-blue-600 underline underline-offset-2"
            >
              Privacy Policy
            </a>
            .
          </li>
          <li>
            We may edit submissions for length or clarity, and may
            decline to publish, or remove, any submission that is false,
            abusive, defamatory, or otherwise inappropriate, at our
            discretion.
          </li>
          <li>
            You will not submit content that infringes the intellectual
            property or privacy rights of any third party.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "5. Intellectual Property",
    body: (
      <p>
        All text, images, logos, graphics, and other content on this
        website — excluding content submitted by users under Section 4 —
        are the property of [Company Name] or our licensors, and are
        protected by applicable copyright and trademark laws. You may not
        reproduce, distribute, or create derivative works from this
        content without our prior written permission.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "6. Acceptable Use",
    body: (
      <>
        <p>When using this website, you agree not to:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Attempt to gain unauthorised access to any part of the site or its systems.</li>
          <li>Introduce viruses, malware, or other harmful code.</li>
          <li>Submit false, misleading, or fraudulent information through any form.</li>
          <li>Use automated tools to scrape or extract content from the site without permission.</li>
        </ul>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "7. Limitation of Liability",
    body: (
      <p>
        To the fullest extent permitted by law, [Company Name] shall not
        be liable for any indirect, incidental, or consequential damages
        arising from your use of this website, reliance on any
        information contained on it, or any dealings with third parties
        referenced on the site. Nothing in these terms limits liability
        that cannot be excluded under Ghanaian law.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "8. Governing Law",
    body: (
      <p>
        These Terms of Service are governed by, and construed in
        accordance with, the laws of Ghana. Any disputes arising from
        these terms or your use of this website will be subject to the
        exclusive jurisdiction of the courts of Ghana.
      </p>
    ),
  },
  {
    id: "changes",
    title: "9. Changes to These Terms",
    body: (
      <p>
        We may update these Terms of Service from time to time. The
        &quot;Last updated&quot; date at the top of this page reflects
        the most recent revision. Continued use of this website after any
        changes constitutes your acceptance of the updated terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "10. Contact Us",
    body: (
      <p>
        If you have questions about these Terms of Service, please contact
        us at{" "}
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

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms of Service"
      intro="These terms cover how you can use this website, what our quotes and estimates do (and don't) guarantee, and the rules around submitting reviews or other content."
      lastUpdated="July 12, 2026"
      sections={sections}
    />
  );
}
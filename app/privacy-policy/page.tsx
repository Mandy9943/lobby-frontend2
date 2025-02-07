const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">
            1. Information We Collect
          </h2>
          <p className="text-gray-700">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>Account information (name, email address)</li>
            <li>Usage data and interaction with our AI services</li>
            <li>Communication preferences</li>
            <li>Feedback and correspondence</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700">We use the collected information to:</p>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>Provide and maintain our AI services</li>
            <li>Improve and personalize user experience</li>
            <li>Communicate with you about our services</li>
            <li>Monitor and analyze usage patterns</li>
            <li>Ensure compliance with our terms of service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            3. Data Storage and Security
          </h2>
          <p className="text-gray-700">
            We implement appropriate technical and organizational measures to
            protect your personal information. However, no method of
            transmission over the Internet is 100% secure, and we cannot
            guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            4. Data Sharing and Disclosure
          </h2>
          <p className="text-gray-700">
            We do not sell your personal information. We may share your
            information with:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>Service providers who assist in our operations</li>
            <li>Law enforcement when required by law</li>
            <li>Third parties with your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            5. Your Rights and Choices
          </h2>
          <p className="text-gray-700">You have the right to:</p>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            6. Cookies and Tracking
          </h2>
          <p className="text-gray-700">
            We use cookies and similar tracking technologies to collect and
            track information about your usage of our services. You can control
            cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            7. Children&apos;s Privacy
          </h2>
          <p className="text-gray-700">
            Our services are not intended for children under 13 years of age. We
            do not knowingly collect personal information from children under
            13.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            8. Changes to Privacy Policy
          </h2>
          <p className="text-gray-700">
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page and
            updating the effective date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">9. Contact Us</h2>
          <p className="text-gray-700">
            If you have questions about this Privacy Policy, please contact us
            at [your contact information].
          </p>
        </section>
      </div>

      <div className="mt-12 text-sm text-gray-600">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

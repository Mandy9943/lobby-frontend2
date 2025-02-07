const TermsOfUse = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using LobbyAI, you accept and agree to be bound by
            the terms and conditions outlined in this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
          <p className="text-gray-700">
            Permission is granted to temporarily access LobbyAI for personal,
            non-commercial use. This is the grant of a license, not a transfer
            of title.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. Service Description</h2>
          <p className="text-gray-700">
            LobbyAI provides AI-powered services for [specific description of
            your services]. We reserve the right to modify, suspend, or
            discontinue any part of the service at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            4. User Responsibilities
          </h2>
          <p className="text-gray-700">
            Users are responsible for maintaining the confidentiality of their
            account information and for all activities that occur under their
            account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">5. Privacy Policy</h2>
          <p className="text-gray-700">
            Your use of LobbyAI is also governed by our Privacy Policy. Please
            review our Privacy Policy to understand our practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">6. Limitations</h2>
          <p className="text-gray-700">
            LobbyAI shall not be liable for any direct, indirect, incidental,
            special, or consequential damages resulting from the use or
            inability to use the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">7. Changes to Terms</h2>
          <p className="text-gray-700">
            We reserve the right to modify these terms at any time. Users will
            be notified of any changes by posting the new terms on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">8. Contact Information</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms of Use, please contact
            us at [your contact information].
          </p>
        </section>
      </div>

      <div className="mt-12 text-sm text-gray-600">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default TermsOfUse;

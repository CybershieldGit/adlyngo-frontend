"use client";

import Footer from "@/components/common/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="bg-[#0A0A0A] min-h-screen pt-[160px] md:pt-32 overflow-x-hidden relative flex flex-col">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_50%,#ffffff_50%,#ffffff_75%,transparent_75%,transparent)] bg-[length:4px_4px] z-0" />

        {/* Top Page Watermark */}
        <div className="absolute top-0 left-0 w-full h-screen flex items-start justify-center pointer-events-none select-none z-0 overflow-hidden pt-40">
          <h2 className="text-[20vw] font-black font-heading leading-none text-white opacity-[0.02] whitespace-nowrap uppercase text-center">
            PRIVACY
          </h2>
        </div>

        <div className="w-full max-w-4xl mx-auto px-6 md:px-8 relative z-10 flex-grow pb-24 font-albert">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center gap-4 mb-16 relative z-10">
            <h1 className="text-6xl md:text-8xl font-black font-heading leading-[0.9] text-white uppercase">
              PRIVACY POLICY
            </h1>
          </div>

          {/* Privacy Content */}
          <div className="text-white/70 text-sm md:text-base leading-relaxed space-y-10">
            <p className="text-white/80 font-normal">
              At Adlyngo, we respect your privacy and are committed to protecting any personal information you share with us. This Privacy Policy explains how Adlyngo (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) collects, uses, and safeguards your information when you visit our website or use our services.
            </p>

            <div className="w-full h-[1px] bg-white/10" />

            {/* Section 1 */}
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-white font-heading uppercase tracking-wide">
                1. Information We Collect
              </h2>

              <div className="space-y-4 pl-4 md:pl-6 border-l border-white/10">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">
                    A. Information Collected Automatically
                  </h3>
                  <p className="text-white/60">
                    When you visit our website, certain information may be collected automatically, including:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-white/60">
                    <li>IP address</li>
                    <li>Browser type and device information</li>
                    <li>Pages visited and time spent on the website</li>
                    <li>Geographic location (approximate)</li>
                    <li>Cookies and analytics data</li>
                  </ul>
                  <p className="text-white/60 pt-2">
                    This information helps us improve website performance, user experience, and marketing effectiveness.
                  </p>
                </div>

                <div className="space-y-2 pt-4">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">
                    B. Information You Provide
                  </h3>
                  <p className="text-white/60">
                    We may collect personal information that you voluntarily provide through contact forms, inquiries, or service requests, including:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-white/60">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Business details</li>
                    <li>Project requirements or preferences</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white font-heading uppercase tracking-wide">
                2. How We Use Your Information
              </h2>
              <p className="text-white/60">
                We use your information to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-white/60 pl-4 md:pl-6 border-l border-white/10">
                <li>Respond to inquiries and service requests</li>
                <li>Provide branding, marketing, and creative services</li>
                <li>Improve website functionality and user experience</li>
                <li>Send updates, proposals, or marketing communication</li>
                <li>Analyze website performance and audience behavior</li>
                <li>Maintain security and prevent misuse</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white font-heading uppercase tracking-wide">
                3. Cookies & Tracking Technologies
              </h2>
              <p className="text-white/60">
                Our website may use cookies and similar technologies to improve browsing experience and measure website performance. These may include:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-white/60 pl-4 md:pl-6 border-l border-white/10">
                <li>Essential cookies</li>
                <li>Performance and analytics cookies</li>
                <li>Advertising and remarketing cookies</li>
              </ul>
              <p className="text-white/60">
                You can control or disable cookies through your browser settings.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white font-heading uppercase tracking-wide">
                4. Third-Party Services
              </h2>
              <p className="text-white/60">
                We may use trusted third-party platforms such as:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-white/60 pl-4 md:pl-6 border-l border-white/10">
                <li>Google Analytics</li>
                <li>Meta Ads</li>
                <li>LinkedIn</li>
                <li>AWS / Cloud hosting providers</li>
                <li>Email marketing tools</li>
              </ul>
              <p className="text-white/60">
                These services may process limited user information to help us operate and improve our services.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white font-heading uppercase tracking-wide">
                5. Data Protection & Security
              </h2>
              <p className="text-white/60">
                We implement appropriate security measures to protect your information from unauthorized access, misuse, or disclosure. This includes:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-white/60 pl-4 md:pl-6 border-l border-white/10">
                <li>Secure hosting environments</li>
                <li>Encrypted communication where applicable</li>
                <li>Restricted internal data access</li>
              </ul>
              <p className="text-white/60">
                However, no method of online transmission or storage is completely secure.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white font-heading uppercase tracking-wide">
                6. Your Rights
              </h2>
              <p className="text-white/60">
                Depending on your location and applicable laws, you may have the right to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-white/60 pl-4 md:pl-6 border-l border-white/10">
                <li>Access your personal information</li>
                <li>Request correction or deletion</li>
                <li>Withdraw consent for marketing communication</li>
                <li>Request data portability where applicable</li>
              </ul>
              <p className="text-white/60">
                To make any request regarding your data, contact us directly.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white font-heading uppercase tracking-wide">
                7. Data Retention
              </h2>
              <p className="text-white/60">
                We retain personal information only for as long as necessary to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-white/60 pl-4 md:pl-6 border-l border-white/10">
                <li>Provide services</li>
                <li>Maintain business records</li>
                <li>Comply with legal obligations</li>
                <li>Improve customer experience</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white font-heading uppercase tracking-wide">
                8. Third-Party Links
              </h2>
              <p className="text-white/60 pl-4 md:pl-6 border-l border-white/10">
                Our website may contain links to external websites or platforms. We are not responsible for the privacy practices or content of third-party websites.
              </p>
            </div>

            {/* Section 9 */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white font-heading uppercase tracking-wide">
                9. Children&apos;s Privacy
              </h2>
              <p className="text-white/60 pl-4 md:pl-6 border-l border-white/10">
                Adlyngo does not knowingly collect personal information from children under the age of 13.
              </p>
            </div>

            {/* Section 10 */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white font-heading uppercase tracking-wide">
                10. Policy Updates
              </h2>
              <p className="text-white/60 pl-4 md:pl-6 border-l border-white/10">
                We may update this Privacy Policy from time to time to reflect changes in our services, technologies, or legal requirements. Updates will be posted on this page.
              </p>
            </div>

            {/* Section 11 */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-white font-heading uppercase tracking-wide">
                11. Contact Us
              </h2>
              <p className="text-white/60">
                If you have any questions regarding this Privacy Policy or your personal data, you can contact us at:
              </p>
              <div className="pl-4 md:pl-6 border-l border-white/10 text-white/80 space-y-1">
                <p className="font-bold">Adlyngo</p>
                <p>Email: <a href="mailto:hello@adlyngo.com" className="text-[#FF6A00] hover:underline">hello@adlyngo.com</a></p>
                <p>Website: <a href="https://www.adlyngo.com" target="_blank" rel="noopener noreferrer" className="text-[#FF6A00] hover:underline">www.adlyngo.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

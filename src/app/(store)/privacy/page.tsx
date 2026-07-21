import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Kibble\'s privacy policy — how we collect, use, and protect your personal data.',
};

const sections = [
  {
    id: 'information-we-collect',
    title: '1. Information We Collect',
    content: [
      {
        sub: 'Personal Information',
        text: 'When you create an account, place an order, or contact us, we may collect your name, email address, phone number, shipping address, and payment details (processed securely by Stripe — we never store full card numbers).',
      },
      {
        sub: 'Usage Data',
        text: 'We automatically collect information about how you interact with our website, including pages visited, time spent, referring URLs, browser type, IP address, and device information.',
      },
      {
        sub: 'Cookies & Tracking',
        text: 'We use cookies and similar tracking technologies to maintain your session, remember preferences, and analyse site traffic. You can control cookie settings through your browser.',
      },
    ],
  },
  {
    id: 'how-we-use-information',
    title: '2. How We Use Your Information',
    content: [
      {
        sub: '',
        text: 'We use the information we collect to: process and fulfil your orders; send order confirmations and shipping updates; provide customer support; personalise your shopping experience; improve our website and products; send promotional emails (with your consent); comply with legal obligations; and detect and prevent fraud.',
      },
    ],
  },
  {
    id: 'information-sharing',
    title: '3. Information Sharing',
    content: [
      {
        sub: '',
        text: 'We do not sell or rent your personal information to third parties. We share your data only with: (a) service providers who assist in operating our business (e.g., Stripe for payments, shipping partners for delivery); (b) law enforcement or government bodies where required by law; and (c) business successors in the event of a merger or acquisition, subject to the same privacy commitments.',
      },
    ],
  },
  {
    id: 'data-security',
    title: '4. Data Security',
    content: [
      {
        sub: '',
        text: 'We implement industry-standard security measures including HTTPS/TLS encryption, secure password hashing (bcrypt), and access controls to protect your personal data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
      },
    ],
  },
  {
    id: 'cookies',
    title: '5. Cookies',
    content: [
      {
        sub: 'Essential Cookies',
        text: 'Required for the website to function correctly (e.g., shopping cart, authentication). These cannot be disabled.',
      },
      {
        sub: 'Analytics Cookies',
        text: 'Help us understand how visitors use our site so we can improve the experience. You may opt out via your browser settings.',
      },
      {
        sub: 'Marketing Cookies',
        text: 'Used to deliver relevant advertisements. You can opt out at any time.',
      },
    ],
  },
  {
    id: 'your-rights',
    title: '6. Your Rights',
    content: [
      {
        sub: '',
        text: 'Depending on your location, you may have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion of your data ("right to be forgotten"); object to or restrict certain processing; and data portability. To exercise any of these rights, contact us at support@kibble.com.',
      },
    ],
  },
  {
    id: 'third-party-links',
    title: '7. Third-Party Links',
    content: [
      {
        sub: '',
        text: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to read their privacy policies.',
      },
    ],
  },
  {
    id: 'changes',
    title: '8. Changes to This Policy',
    content: [
      {
        sub: '',
        text: 'We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. We encourage you to review this page periodically. Continued use of our services after changes constitutes acceptance of the updated policy.',
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-100 text-brand-600 mb-6 text-2xl">
          🔒
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
        <p className="text-gray-500">Last updated: July 10, 2026</p>
        <p className="text-gray-600 mt-4 leading-relaxed max-w-2xl">
          At Kibble, we are committed to protecting your privacy. This policy explains what information we collect, how we use it, and the choices you have. By using our website, you agree to the practices described here.
        </p>
      </div>

      {/* Table of Contents */}
      <nav className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-12">
        <h2 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Table of Contents</h2>
        <ul className="space-y-2">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-brand-600 hover:underline text-sm">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sections */}
      <div className="space-y-12">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">{section.title}</h2>
            <div className="space-y-5">
              {section.content.map((item, idx) => (
                <div key={idx}>
                  {item.sub && (
                    <h3 className="font-semibold text-gray-800 mb-1.5">{item.sub}</h3>
                  )}
                  <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Contact */}
      <div className="mt-16 bg-white bg-white rounded-xl border border-gray-100 p-8">
        <h2 className="font-bold text-gray-900 mb-2">Questions About This Policy?</h2>
        <p className="text-sm text-gray-500 mb-4">
          If you have any questions or concerns about our Privacy Policy, please contact us at:
        </p>
        <address className="not-italic text-sm text-gray-600 space-y-1">
          <p><strong>Kibble</strong></p>
          <p>#68, St 336, Tuol Svay Prey Pir, Chamkarmon, Phnom Penh, Cambodia</p>
          <p>Email: <a href="mailto:support@kibble.com" className="text-brand-600 hover:underline">support@kibble.com</a></p>
          <p>Phone: (+855) 086 664 583</p>
        </address>
        <Link href="/contact" className="inline-block mt-4 text-sm font-medium text-brand-600 hover:underline">
          Contact Us →
        </Link>
      </div>
    </div>
  );
}

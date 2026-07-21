import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Kibble\'s Terms of Service — the rules and guidelines for using our platform.',
};

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    text: 'By accessing or using the Kibble website (the "Service"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our Service. We reserve the right to update these terms at any time — continued use after changes constitutes acceptance.',
  },
  {
    id: 'account',
    title: '2. Your Account',
    text: 'You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately at support@kibble.com if you suspect unauthorised access. Kibble reserves the right to terminate accounts that violate these terms.',
  },
  {
    id: 'purchases',
    title: '3. Purchases & Pricing',
    text: 'All prices are displayed in US dollars and are subject to change without notice. We reserve the right to refuse or cancel any order for any reason, including pricing errors or suspected fraudulent activity. Payment is processed at the time of order via Stripe. You represent that you are authorised to use the payment method provided.',
  },
  {
    id: 'shipping',
    title: '4. Shipping & Delivery',
    text: 'Delivery timelines are estimates and not guaranteed. Kibble is not liable for delays caused by third-party carriers, customs, or force majeure events. Risk of loss transfers to the carrier upon handover. If your order is lost or significantly delayed, contact us and we will investigate promptly.',
  },
  {
    id: 'returns',
    title: '5. Returns & Refunds',
    text: 'Our return and refund policy is governed by the terms described on our Return Policy page, which is incorporated herein by reference. Refunds are issued to the original payment method only.',
  },
  {
    id: 'prohibited',
    title: '6. Prohibited Uses',
    text: 'You agree not to: (a) use the Service for any unlawful purpose; (b) attempt to gain unauthorised access to any system or network; (c) scrape, crawl, or data-mine our website without prior written consent; (d) post or transmit any content that is fraudulent, harmful, or infringing on intellectual property rights; (e) engage in any activity that interferes with or disrupts the Service.',
  },
  {
    id: 'ip',
    title: '7. Intellectual Property',
    text: 'All content on the Kibble website — including logos, product images, text, and design — is owned by or licensed to Kibble and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.',
  },
  {
    id: 'disclaimer',
    title: '8. Disclaimer of Warranties',
    text: 'The Service is provided on an "as is" and "as available" basis without warranties of any kind, express or implied. Kibble makes no warranty that the Service will be uninterrupted, error-free, or free of viruses. Pet health outcomes from product use are not guaranteed by Kibble.',
  },
  {
    id: 'liability',
    title: '9. Limitation of Liability',
    text: 'To the fullest extent permitted by law, Kibble shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service or products purchased through it. Our aggregate liability is limited to the amount you paid for the order giving rise to the claim.',
  },
  {
    id: 'governing-law',
    title: '10. Governing Law',
    text: 'These Terms shall be governed by and construed in accordance with the laws of Cambodia. Any dispute arising shall be resolved through good-faith negotiation. Failing that, disputes shall be submitted to binding arbitration in Phnom Penh, Cambodia.',
  },
  {
    id: 'contact',
    title: '11. Contact',
    text: 'Questions about these Terms? Email us at support@kibble.com or write to us at #68, St 336, Tuol Svay Prey Pir, Chamkarmon, Phnom Penh, Cambodia.',
  },
];

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-100 text-gray-600 mb-6 text-2xl">
          📄
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Terms of Service</h1>
        <p className="text-gray-500">Last updated: July 10, 2026</p>
        <p className="text-gray-600 mt-4 leading-relaxed max-w-2xl">
          Please read these Terms of Service carefully before using Kibble. By accessing our website or placing an order, you agree to be bound by these terms.
        </p>
      </div>

      {/* Table of Contents */}
      <nav className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-12">
        <h2 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Table of Contents</h2>
        <ul className="space-y-2 columns-2">
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
      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-3 border-b border-gray-100">{section.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{section.text}</p>
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-16 flex flex-col sm:flex-row gap-4">
        <Link href="/privacy" className="flex-1 bg-white rounded-xl border border-gray-100 p-6 hover:border-brand-200 transition-colors group">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Also Read</p>
          <p className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">Privacy Policy →</p>
        </Link>
        <Link href="/returns" className="flex-1 bg-white rounded-xl border border-gray-100 p-6 hover:border-brand-200 transition-colors group">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Also Read</p>
          <p className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">Return Policy →</p>
        </Link>
      </div>
    </div>
  );
}

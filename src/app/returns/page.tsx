import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Return Policy',
  description: 'Kibble\'s hassle-free return and refund policy. Returns accepted within 14 days for eligible products.',
};

const eligible = [
  'Unopened products in original, undamaged packaging',
  'Defective or damaged items received',
  'Incorrect items sent due to our error',
  'Non-perishable accessories (toys, beds, grooming tools)',
];

const notEligible = [
  'Opened or partially used food and treats',
  'Perishable products (wet food, fresh items)',
  'Items returned more than 14 days after delivery',
  'Products without original packaging or proof of purchase',
  'Items purchased on clearance or final sale',
];

const steps = [
  { step: '01', title: 'Contact Support', desc: 'Email support@kibble.com with your order number and reason for return within 14 days of delivery.' },
  { step: '02', title: 'Receive Authorisation', desc: 'Our team reviews your request and sends a Return Merchandise Authorisation (RMA) within 24 business hours.' },
  { step: '03', title: 'Ship the Item', desc: 'Pack the item securely and drop it off at any courier. Include your RMA number on the package.' },
  { step: '04', title: 'Get Your Refund', desc: 'Once inspected (1–2 business days), your refund is processed to the original payment method within 5–7 days.' },
];

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
      {/* Breadcrumb */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-600 mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 text-brand-600 mb-6 text-3xl">
          ↩️
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Return Policy</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          We want every Kibble purchase to be perfect. If something isn't right, we make returns simple and stress-free.
        </p>
      </div>

      {/* Policy Window */}
      <div className="bg-brand-600 text-white rounded-2xl p-8 mb-12 flex flex-col sm:flex-row items-center gap-6 shadow-lg">
        <div className="text-6xl font-black text-white/20">14</div>
        <div>
          <p className="text-xl font-bold mb-1">Day Return Window</p>
          <p className="text-brand-100 text-sm leading-relaxed">
            You have 14 days from the date of delivery to initiate a return. After this period, we are unable to accept returns unless the item is faulty.
          </p>
        </div>
      </div>

      {/* Eligibility */}
      <div className="grid md:grid-cols-2 gap-6 mb-14">
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" /> Eligible for Return
          </h2>
          <ul className="space-y-3">
            {eligible.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-400" /> Not Eligible for Return
          </h2>
          <ul className="space-y-3">
            {notEligible.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* How it Works */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How the Return Process Works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-5xl font-black text-gray-50 select-none">{s.step}</div>
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 text-sm font-bold flex items-center justify-center mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shipping Cost Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-14">
        <h3 className="font-semibold text-amber-900 mb-2">📬 Return Shipping Costs</h3>
        <p className="text-sm text-amber-800 leading-relaxed">
          If the return is due to a defective product or our shipping error, Kibble covers the return shipping cost.
          For change-of-mind returns, the customer is responsible for shipping charges.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10">
        <p className="text-gray-700 font-medium mb-2">Ready to start a return?</p>
        <p className="text-gray-500 text-sm mb-6">Reach out and we'll take care of you.</p>
        <Link
          href="/contact"
          className="inline-block bg-brand-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-700 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}

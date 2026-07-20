import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Kibble support team. We respond within 24 hours.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-5xl">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 text-brand-600 mb-6 text-3xl">
          💬
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Contact Us</h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Have a question, concern, or just want to say hello? We&apos;d love to hear from you.
        </p>
      </div>

      {/* Client component handles channels + form */}
      <ContactForm />
    </div>
  );
}

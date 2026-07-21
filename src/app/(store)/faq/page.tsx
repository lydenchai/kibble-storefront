import type { Metadata } from 'next';
import { FAQItem } from './FAQItem';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about orders, shipping, products, and returns at Kibble.',
};

const faqs = [
  {
    category: '🛒 Orders & Payment',
    items: [
      {
        q: 'How do I place an order?',
        a: "Browse our products, add items to your cart, and proceed to checkout. You can pay securely using a credit/debit card via Stripe. You'll receive a confirmation email once your order is placed.",
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'You can request a modification or cancellation within 1 hour of placing your order by contacting our support team at support@kibble.com. Once the order is being processed, we are unable to make changes.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex) processed securely through Stripe. We do not store your card details.',
      },
      {
        q: 'Will I receive an invoice?',
        a: 'Yes. A detailed order invoice is sent to your registered email address immediately after a successful purchase.',
      },
    ],
  },
  {
    category: '📦 Shipping & Delivery',
    items: [
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery takes 3–5 business days within Phnom Penh and 5–10 business days for provincial orders. Express options may be available at checkout.',
      },
      {
        q: 'How can I track my order?',
        a: "Once your order is shipped, you'll receive a tracking number via email. You can also log into your account and visit the Orders section to see real-time updates.",
      },
      {
        q: 'Is free shipping available?',
        a: 'We offer free standard shipping on all orders over $50. Orders below this threshold incur a flat shipping fee shown at checkout.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently we ship within Cambodia only. International shipping is on our roadmap — subscribe to our newsletter to be the first to know when it launches.',
      },
    ],
  },
  {
    category: '🐾 Products',
    items: [
      {
        q: 'Are all products safe for my pets?',
        a: 'Absolutely. Every product on Kibble is carefully vetted for quality and safety. We only source from brands that meet international pet food and product standards.',
      },
      {
        q: 'How do I find the right food for my pet?',
        a: 'Use the filters on our product listing pages to narrow by pet type, category, and brand. Each product page includes a full description, ingredients, and size guide.',
      },
      {
        q: "Are product expiry dates guaranteed?",
        a: "Yes. We only ship products with a minimum of 6 months remaining on their expiry date. If you ever receive a product that doesn't meet this standard, contact us immediately.",
      },
    ],
  },
  {
    category: '↩️ Returns & Refunds',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 14 days of delivery for unopened, unused products in original packaging. Perishable items (food, treats) are non-returnable unless faulty.',
      },
      {
        q: 'How do I initiate a return?',
        a: 'Email support@kibble.com with your order number and the reason for the return. Our team will guide you through the process within 24 business hours.',
      },
      {
        q: 'When will I receive my refund?',
        a: 'Once we receive and inspect your return, refunds are processed within 5–7 business days to your original payment method.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-3xl">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 text-brand-600 mb-6 text-3xl">
          ❓
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h1>
        <p className="text-gray-500 text-lg">
          Everything you need to know about shopping with Kibble. Can&apos;t find your answer?{' '}
          <a href="/contact" className="text-brand-600 hover:underline font-medium">
            Contact us
          </a>
          .
        </p>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-10">
        {faqs.map((section) => (
          <section key={section.category}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{section.category}</h2>
            <div className="space-y-3">
              {section.items.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center bg-white rounded-xl border border-gray-100 p-10">
        <p className="text-gray-700 font-medium mb-2">Still have questions?</p>
        <p className="text-gray-500 text-sm mb-6">
          Our support team is ready to help you Monday – Saturday, 9 am – 6 pm.
        </p>
        <a
          href="/contact"
          className="inline-block bg-brand-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-700 transition-colors"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}

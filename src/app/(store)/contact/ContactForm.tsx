'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';

const channels = [
  {
    icon: <Mail className="h-6 w-6" />,
    label: 'Email',
    value: 'support@kibble.com',
    sub: 'Response within 24 hours',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: <Phone className="h-6 w-6" />,
    label: 'Phone',
    value: '(+855) 086 664 583',
    sub: 'Mon–Sat, 9 am – 6 pm',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    label: 'Address',
    value: '#68, St 336, Chamkarmon',
    sub: 'Phnom Penh, Cambodia',
    color: 'bg-brand-50 text-brand-600',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    label: 'Business Hours',
    value: 'Mon – Sat: 9 am – 6 pm',
    sub: 'Sunday: Closed',
    color: 'bg-purple-50 text-purple-600',
  },
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    await new Promise((r) => setTimeout(r, 1200));
    setFormState('success');
  };

  return (
    <>
      {/* Contact Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        {channels.map((c) => (
          <div key={c.label} className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.color}`}>
              {c.icon}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{c.label}</p>
              <p className="font-semibold text-gray-900 text-sm">{c.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Send Us a Message</h2>
          <p className="text-sm text-gray-500 mt-1">Fill out the form and we&apos;ll get back to you as soon as possible.</p>
        </div>

        {formState === 'success' ? (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-500 text-sm max-w-sm">
              Thanks for reaching out, <strong>{form.name}</strong>. We&apos;ll reply to{' '}
              <strong>{form.email}</strong> within 24 business hours.
            </p>
            <button
              onClick={() => {
                setFormState('idle');
                setForm({ name: '', email: '', subject: '', message: '' });
              }}
              className="mt-6 text-sm font-medium text-brand-600 hover:underline cursor-pointer"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                id="contact-subject"
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition bg-white"
              >
                <option value="" disabled>Select a subject…</option>
                <option value="order">Order Enquiry</option>
                <option value="return">Return / Refund</option>
                <option value="product">Product Question</option>
                <option value="shipping">Shipping Issue</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us how we can help…"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition resize-none"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={formState === 'loading'}
                className="bg-brand-600 text-white font-semibold px-10 py-3 rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-60 cursor-pointer"
              >
                {formState === 'loading' ? 'Sending…' : 'Send Message'}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

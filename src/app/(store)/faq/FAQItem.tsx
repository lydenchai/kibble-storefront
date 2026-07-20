'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-medium text-gray-900">{q}</span>
        <ChevronDown
          className={`h-5 w-5 text-brand-600 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-6 py-5 bg-brand-50/50 border-t border-gray-100 text-sm text-gray-600 leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

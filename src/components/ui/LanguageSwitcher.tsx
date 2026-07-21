'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const LANGUAGES = [
  { code: 'km', label: 'ខ្មែរ' },
  { code: 'ch', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'vn', label: 'Tiếng Việt' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage, mounted } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) return <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />;

  const currentLangLabel = LANGUAGES.find(l => l.code === language)?.label || 'Language';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-gray-600"
        aria-label="Select Language"
      >
        <img src={`/icons/${language}.webp`} alt={language} className="h-5 w-6" />
        <span className="hidden sm:inline-block text-sm font-medium">{currentLangLabel}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
          <div className="py-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                  language === lang.code 
                    ? 'bg-brand-50 text-brand-600 font-medium' 
                    : 'text-gray-700 hover:bg-brand-50'
                }`}
              >
                 <img src={`/icons/${lang.code}.webp`} alt={lang.code} className="h-5 w-6" />
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

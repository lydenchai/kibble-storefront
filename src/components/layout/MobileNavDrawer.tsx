"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { X, Sparkles, Dog, Cat, Award, Flame, User, ShoppingBag } from 'lucide-react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const { t } = useTranslation();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { href: '/category/dog', label: t('header.dog') || 'Dog Supplies', icon: Dog },
    { href: '/category/cat', label: t('header.cat') || 'Cat Supplies', icon: Cat },
    { href: '/brands', label: t('header.brands') || 'Popular Brands', icon: Award },
    { href: '/offers', label: t('header.offers') || 'Deals & Offers', icon: Flame },
    { href: '/account', label: 'My Account & Orders', icon: User },
    { href: '/cart', label: 'Shopping Cart', icon: ShoppingBag },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-brand-50/50">
            <span className="text-2xl font-black text-brand-600 tracking-tight">
              {t('title')}
            </span>
            <button
              onClick={onClose}
              type="button"
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold text-gray-700 hover:text-brand-600 hover:bg-brand-50/80 transition-all group"
                >
                  <Icon className="h-5 w-5 text-gray-400 group-hover:text-brand-600 transition-colors" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Footer Controls */}
          <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">Language:</span>
              <LanguageSwitcher />
            </div>

            <div className="pt-2 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} Kibble Pet Care Inc.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

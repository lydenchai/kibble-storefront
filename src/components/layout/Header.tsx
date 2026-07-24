'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import CartIcon from '@/components/cart/CartIcon';
import CartDrawer from '@/components/cart/CartDrawer';
import AuthIcon from '@/components/auth/AuthIcon';
import SearchBar from '@/components/layout/SearchBar';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import MobileNavDrawer from '@/components/layout/MobileNavDrawer';
import { useTranslation } from '@/hooks/useTranslation';

export default function Header() {
  const { t } = useTranslation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 group">
                <span className="text-3xl font-extrabold tracking-tight text-brand-600 group-hover:text-brand-700 transition-colors">
                  {t('title')}
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/category/dog" className="text-sm font-semibold text-gray-700 hover:text-brand-600 transition-colors">
                {t('header.dog')}
              </Link>
              <Link href="/category/cat" className="text-sm font-semibold text-gray-700 hover:text-brand-600 transition-colors">
                {t('header.cat')}
              </Link>
              <Link href="/brands" className="text-sm font-semibold text-gray-700 hover:text-brand-600 transition-colors">
                {t('header.brands')}
              </Link>
              <Link href="/offers" className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                {t('header.offers')}
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="relative group">
                <SearchBar />
              </div>
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>
              <CartIcon />
              <AuthIcon />
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="md:hidden p-2 text-gray-600 hover:text-brand-600 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Slide-Out Drawers */}
      <CartDrawer />
      <MobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}

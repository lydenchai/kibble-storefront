'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="bg-brand-50 rounded-2xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-brand-100 shadow-sm">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t('footer.joinPack')}</h2>
            <p className="text-gray-600">{t('footer.subscribeDesc')}</p>
          </div>
          <div className="w-full md:w-auto flex-1 max-w-md">
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
                required
              />
              <button 
                type="button" 
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-full transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
              >
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & About */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold text-brand-600">{t('title')}</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {t('footer.brandDesc')}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-brand-600 transition-colors">
                {/* @ts-expect-error React 19 typing compatibility */}
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-600 transition-colors">
                {/* @ts-expect-error React 19 typing compatibility */}
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-600 transition-colors">
                {/* @ts-expect-error React 19 typing compatibility */}
                <FaTwitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/category/dog" className="text-gray-600 hover:text-brand-600 text-sm transition-colors">
                  {t('footer.dogFood')}
                </Link>
              </li>
              <li>
                <Link href="/category/cat" className="text-gray-600 hover:text-brand-600 text-sm transition-colors">
                  {t('footer.catFood')}
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-gray-600 hover:text-brand-600 text-sm transition-colors">
                  {t('footer.topBrands')}
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-gray-600 hover:text-brand-600 text-sm transition-colors">
                  {t('footer.specialOffers')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-6">{t('footer.customerService')}</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/account/orders" className="text-gray-600 hover:text-brand-600 text-sm transition-colors">
                  {t('footer.trackOrder')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-brand-600 text-sm transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-brand-600 text-sm transition-colors">
                  {t('footer.returns')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-brand-600 text-sm transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-6">{t('footer.contactInfo')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="h-5 w-5 text-brand-600 shrink-0" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="h-5 w-5 text-brand-600 shrink-0" />
                <span>{t('footer.phone')}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="h-5 w-5 text-brand-600 shrink-0" />
                <span>{t('footer.email')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

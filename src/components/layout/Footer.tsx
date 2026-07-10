import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & About */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold text-brand-600">Kibble</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Your one-stop destination for premium pet food, treats, and accessories. We care about your furry friends as much as you do.
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
            <h3 className="text-gray-900 font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/category/dog" className="text-gray-600 hover:text-brand-600 text-sm transition-colors">
                  Dog Food & Supplies
                </Link>
              </li>
              <li>
                <Link href="/category/cat" className="text-gray-600 hover:text-brand-600 text-sm transition-colors">
                  Cat Food & Supplies
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-gray-600 hover:text-brand-600 text-sm transition-colors">
                  Top Brands
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-gray-600 hover:text-brand-600 text-sm transition-colors">
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-6">Customer Service</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/account/orders" className="text-gray-600 hover:text-brand-600 text-sm transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-brand-600 text-sm transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-brand-600 text-sm transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-brand-600 text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="h-5 w-5 text-brand-600 shrink-0" />
                <span>#68, St 336, Tuol Svay Prey Pir, Chamkarmon, Phnom Penh, Cambodia</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="h-5 w-5 text-brand-600 shrink-0" />
                <span>(+855) 086 664 583</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="h-5 w-5 text-brand-600 shrink-0" />
                <span>support@kibble.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Kibble Storefront. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

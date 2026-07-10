import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import CartIcon from '@/components/cart/CartIcon';
import AuthIcon from '@/components/auth/AuthIcon';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-brand-600">Kibble</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/category/dog" className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors">
              Dog
            </Link>
            <Link href="/category/cat" className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors">
              Cat
            </Link>
            <Link href="/brands" className="text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors">
              Brands
            </Link>
            <Link href="/offers" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
              Offers
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex relative group">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-brand-500" />
            </div>

            <button className="md:hidden p-2 text-gray-600 hover:text-brand-600 transition-colors cursor-pointer">
              <Search className="h-5 w-5" />
            </button>
            
            <AuthIcon />

            <CartIcon />

            <button className="md:hidden p-2 -mr-2 text-gray-600 hover:text-brand-600 transition-colors cursor-pointer">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

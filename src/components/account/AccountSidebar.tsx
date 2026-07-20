'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Package, User as UserIcon, Heart, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const navItems = [
  { href: '/account', icon: UserIcon, label: 'Overview' },
  { href: '/account/orders', icon: Package, label: 'Orders' },
  { href: '/account/wishlist', icon: Heart, label: 'Wishlist' },
  { href: '/account/settings', icon: Settings, label: 'Settings' },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleSignOut = async () => {
    await logout();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="w-full md:w-64 flex-shrink-0">
      <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 overflow-hidden">
        <div className="flex items-center gap-3 p-6 border-b border-gray-100 bg-brand-50">
          <div className="w-14 h-14 bg-brand-200 rounded-full flex items-center justify-center text-brand-700 text-xl font-bold shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="font-bold text-gray-900 truncate">{user.name}</h2>
            <p className="text-sm text-gray-600 truncate" title={user.email}>{user.email}</p>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-gray-100">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

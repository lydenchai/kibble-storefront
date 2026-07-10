"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, LogIn } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function AuthIcon() {
  const [mounted, setMounted] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-2 text-gray-600">
        <User className="h-5 w-5" />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Link href="/account" className="p-2 text-gray-600 hover:text-brand-600 transition-colors" title="Account">
        <User className="h-5 w-5" />
      </Link>
    );
  }

  return (
    <Link href="/login" className="flex items-center gap-2 p-2 text-gray-600 hover:text-brand-600 transition-colors" title="Login">
      <LogIn className="h-5 w-5" />
      <span className="hidden md:block text-sm font-medium">Sign In</span>
    </Link>
  );
}

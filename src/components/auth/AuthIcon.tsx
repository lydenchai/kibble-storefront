"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function AuthIcon() {
  const [mounted, setMounted] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    setMounted(true);
  }, []);

  const href = mounted && isAuthenticated ? "/account" : "/login";
  const title = mounted && isAuthenticated ? "Account Overview" : "Login";

  return (
    <Link 
      href={href} 
      className="p-2 text-gray-600 hover:text-brand-600 hover:bg-gray-100 rounded-full transition-all flex items-center justify-center cursor-pointer" 
      title={title}
    >
      <User className="h-5 w-5" />
    </Link>
  );
}

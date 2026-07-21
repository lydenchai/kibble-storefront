"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search } from 'lucide-react';

function SearchBarContent() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Create a new URLSearchParams to preserve existing filters but add search
      const params = new URLSearchParams(searchParams.toString());
      params.set('search', query.trim());
      // Make sure we go to /products for global search, or stay if already there
      const targetPath = pathname.startsWith('/category/') || pathname === '/products' ? pathname : '/products';
      router.push(`${targetPath}?${params.toString()}`);
    } else {
      // If they clear the search box, remove search param
      if (searchParams.has('search')) {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('search');
        router.push(`${pathname}?${params.toString()}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group w-full sm:w-64 focus-within:sm:w-80 transition-all duration-300 ease-in-out">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent focus:bg-white transition-all duration-300 ease-in-out"
      />
      <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer">
        <Search className="h-4 w-4 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
      </button>
    </form>
  );
}

export default function SearchBar() {
  return (
    <Suspense fallback={<div className="relative w-full sm:w-64"><div className="w-full h-9 bg-gray-50 rounded-full animate-pulse border border-gray-200"></div></div>}>
      <SearchBarContent />
    </Suspense>
  );
}

"use client";

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Loader2, ArrowRight } from 'lucide-react';
import { getProductsAction } from '@/actions/product.actions';
import { Product } from '@/types/product';

function SearchBarContent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Debounced search query
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await getProductsAction({ search: trimmed, limit: '5' });
        setResults(res.data || []);
        setIsOpen(true);
      } catch (error) {
        console.error("Instant search error:", error);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside & Escape key listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      const params = new URLSearchParams(searchParams.toString());
      params.set('search', query.trim());
      const targetPath = pathname.startsWith('/category/') || pathname === '/products' ? pathname : '/products';
      router.push(`${targetPath}?${params.toString()}`);
    } else if (searchParams.has('search')) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('search');
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleProductClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={containerRef} className="relative group w-full sm:w-64 focus-within:sm:w-80 transition-all duration-300 ease-in-out">
      <form onSubmit={handleSubmit} className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setIsOpen(true); }}
          placeholder="Search products..."
          className="w-full pl-10 pr-9 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent focus:bg-white transition-all duration-300 ease-in-out"
        />
        <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer">
          <Search className="h-4 w-4 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
        </button>
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Loader2 className="h-4 w-4 text-brand-600 animate-spin" />
          </div>
        )}
      </form>

      {/* Live Autocomplete Results Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-50 p-2 animate-in fade-in-50 zoom-in-95 duration-150">
          {results.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-50">
                Products ({results.length})
              </div>
              {results.map((product) => {
                const price = product.variants?.[0]?.price || 0;
                return (
                  <Link
                    key={product._id}
                    href={`/products/${product.slug}`}
                    onClick={handleProductClick}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-brand-50/70 transition-colors group/item"
                  >
                    <div className="relative w-11 h-11 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-contain p-1"
                          sizes="44px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs">🐾</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-brand-600 font-semibold uppercase tracking-wider truncate">
                        {product.brand}
                      </div>
                      <div className="text-sm font-semibold text-gray-900 truncate group-hover/item:text-brand-600 transition-colors">
                        {product.name}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-gray-900 shrink-0">
                      ${price.toFixed(2)}
                    </div>
                  </Link>
                );
              })}
              <button
                onClick={handleSubmit}
                type="button"
                className="w-full mt-1 p-2.5 text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 rounded-xl hover:bg-brand-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>View all search results</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : !loading ? (
            <div className="p-4 text-center text-xs text-gray-500">
              No products found for &ldquo;{query}&rdquo;
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default function SearchBar() {
  return (
    <Suspense fallback={<div className="relative w-full sm:w-64"><div className="w-full h-9 bg-gray-50 rounded-full animate-pulse border border-gray-200"></div></div>}>
      <SearchBarContent />
    </Suspense>
  );
}

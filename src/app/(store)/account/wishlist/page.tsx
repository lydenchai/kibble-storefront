'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Trash2, ShoppingCart, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { fetchWishlistAction, toggleWishlistAction } from '@/actions/account.actions';
import AccountSidebar from '@/components/account/AccountSidebar';

interface WishlistProduct {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  images: string[];
  variants: { price: number; compareAtPrice?: number; stock: number }[];
}

export default function WishlistPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && !user) router.push('/login');
  }, [mounted, user, router]);

  useEffect(() => {
    if (!mounted || !user) return;
    const fetchWishlist = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetchWishlistAction(token);
        setItems(res.data?.wishlist || []);
      } catch {
        setError('Failed to load wishlist.');
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [mounted, user]);

  const handleRemove = async (productId: string) => {
    setRemoving(productId);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await toggleWishlistAction(productId, token);
      // Server returns updated wishlist array of IDs — re-filter locally
      const updatedIds: string[] = res.data?.wishlist || [];
      setItems((prev) => prev.filter((p) => updatedIds.includes(p._id)));
    } catch {
      // silent
    } finally {
      setRemoving(null);
    }
  };

  if (!mounted || !user) return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-6">
        <AccountSidebar />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
            {items.length > 0 && (
              <span className="text-sm text-gray-500">{items.length} item{items.length !== 1 ? 's' : ''}</span>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/60 rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-100 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-3" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          ) : items.length === 0 ? (
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-100/50 p-16 text-center">
              <Heart className="h-16 w-16 text-gray-200 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 text-sm mb-6">Save products you love and come back to them later.</p>
              <Link
                href="/products"
                className="inline-block bg-brand-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-700 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((product) => {
                const lowestPrice = product.variants.length
                  ? Math.min(...product.variants.map((v) => v.price))
                  : 0;
                const compareAt = product.variants[0]?.compareAtPrice;
                const isRemoving = removing === product._id;

                return (
                  <div key={product._id} className="group bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-100/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden hover:shadow-lg transition-all duration-300">
                    <Link href={`/products/${product.slug}`} className="relative aspect-[4/3] bg-gray-50 block overflow-hidden">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">
                          <span className="text-4xl">🐾</span>
                        </div>
                      )}
                    </Link>
                    <div className="p-4">
                      <div className="text-xs text-brand-600 font-medium uppercase tracking-wider mb-1">{product.brand}</div>
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 hover:text-brand-600 transition-colors mb-3">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-gray-900">${lowestPrice.toFixed(2)}</span>
                          {compareAt && compareAt > lowestPrice && (
                            <span className="ml-2 text-xs text-gray-400 line-through">${compareAt.toFixed(2)}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors cursor-pointer"
                            title="Add to Cart"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRemove(product._id)}
                            disabled={isRemoving}
                            className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors cursor-pointer disabled:opacity-40"
                            title="Remove from Wishlist"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

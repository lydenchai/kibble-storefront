"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { AddToCartButtonProps } from '@/types/components';
import toast from 'react-hot-toast';

export default function AddToCartButton({ product, selectedVariantIndex = 0 }: AddToCartButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  // Guard against Zustand persist rehydration race: don't read auth state until mounted
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleAddToCart = () => {
    // Use `user` (not `isAuthenticated`) as truth — avoids stale value before persist rehydration
    const user = useAuthStore.getState().user;
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!product.variants || product.variants.length === 0) return;

    const variant = product.variants[selectedVariantIndex];
    if (!variant) return;

    addItem(product, variant, quantity);

    setIsAdded(true);
    toast.success(`Added ${quantity} ${product.name} to cart`);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border border-gray-300 rounded-full bg-white">
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-brand-600 cursor-pointer"
          type="button"
        >
          -
        </button>
        <span className="w-8 text-center font-medium text-gray-900">{quantity}</span>
        <button 
          onClick={() => setQuantity(quantity + 1)}
          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-brand-600 cursor-pointer"
          type="button"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={!hydrated}
        className={`flex-1 font-bold py-3.5 rounded-full transition-colors shadow-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer ${
          isAdded
            ? 'bg-green-600 text-white shadow-green-500/30'
            : 'bg-brand-600 text-white hover:bg-brand-700 shadow-brand-500/30'
        }`}
        aria-label={`Add ${product.name} to cart`}
        type="button"
      >
        {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { useTranslation } from '@/hooks/useTranslation';

export default function CartPage() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const subtotal = getTotalPrice();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center">Loading cart...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center max-w-2xl">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('cart.emptyTitle')}</h1>
        <p className="text-gray-600 mb-8">
          {t('cart.emptyDesc')}
        </p>
        <Link 
          href="/products" 
          className="inline-block bg-brand-600 text-white font-semibold px-8 py-4 rounded-full hover:bg-brand-700 transition-colors shadow-lg"
        >
          {t('cart.startShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('cart.shoppingCart')}</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-8 overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.id} className="mb-3 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="relative w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                    {item.product.images?.[0] ? (
                      <Image 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        fill 
                        className="object-contain p-2" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">🐾</div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.slug}`}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-brand-600 truncate">{item.product.name}</h3>
                    </Link>
                    <div className="text-sm text-gray-500 mt-1">
                      {item.variant.size && <span className="mr-3">{t('cart.size')} {item.variant.size}</span>}
                      {item.variant.flavor && <span>{t('cart.flavor')} {item.variant.flavor}</span>}
                    </div>
                    <div className="text-brand-600 font-bold mt-2">${item.variant.price.toFixed(2)}</div>
                  </div>

                  <div className="flex items-center gap-6 mt-4 sm:mt-0 w-full sm:w-auto justify-between">
                    <div className="flex items-center border border-gray-300 rounded-full bg-white">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-brand-600 cursor-pointer"
                        aria-label="Decrease quantity"
                      >-</button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-brand-600 cursor-pointer"
                        aria-label="Increase quantity"
                      >+</button>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button 
                onClick={clearCart} 
                className="text-sm font-medium text-gray-500 hover:text-red-600 cursor-pointer"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-[400px]">
          <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t('checkout.orderSummary')}</h2>
            
            <div className="space-y-4 text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>{t('cart.subtotal')}</span>
                <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('checkout.shipping')}</span>
                <span className="text-sm">{t('cart.calculatedNextStep')}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">{t('checkout.total')}</span>
                <span className="text-2xl font-bold text-brand-600">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <Link 
              href="/checkout"
              className="w-full flex items-center justify-center bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/25 mb-4"
            >
              {t('cart.checkout')}
            </Link>

            <button 
              onClick={clearCart}
              className="w-full text-gray-500 hover:text-red-500 text-sm font-medium transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

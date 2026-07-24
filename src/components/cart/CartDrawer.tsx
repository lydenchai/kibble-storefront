"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useTranslation } from '@/hooks/useTranslation';

export default function CartDrawer() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  if (!mounted || !isCartOpen) return null;

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="h-5 w-5 text-brand-600" />
              <h2 className="text-lg font-bold text-gray-900">
                Your Shopping Cart
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-100 text-brand-700">
                {totalItems}
              </span>
            </div>
            <button
              onClick={closeCart}
              type="button"
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length > 0 ? (
              items.map((item) => {
                const itemPrice = item.variant.price * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-xs hover:border-gray-200 transition-all"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100 p-1">
                      {item.product.images?.[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-contain p-1"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">🐾</div>
                      )}
                    </div>

                    {/* Details & Controls */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-bold text-gray-900 truncate">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">
                          {item.variant.weight || item.variant.size || item.variant.flavor || `SKU: ${item.variant.sku}`}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                        {/* Quantity Buttons */}
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold text-gray-900 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <span className="text-sm font-extrabold text-gray-900">
                          ${itemPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 px-4">
                <div className="text-5xl mb-4">🛒</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Your Cart is Empty</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Explore our premium food, treats, and supplies for your companion!
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-brand-600 text-white font-bold text-sm rounded-full hover:bg-brand-700 transition-colors shadow-md cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkout Actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
              <div className="flex items-center justify-between text-base font-bold text-gray-900">
                <span>Subtotal</span>
                <span className="text-xl font-black text-brand-600">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500">Shipping & taxes calculated at checkout.</p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="py-3 px-4 bg-white border border-gray-200 hover:border-gray-300 text-gray-800 font-bold rounded-xl text-center text-xs transition-colors shadow-xs"
                >
                  View Full Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-center text-xs transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Checkout</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

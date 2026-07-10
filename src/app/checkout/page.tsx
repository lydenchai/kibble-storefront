"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { createPaymentIntentAction } from '@/actions/checkout.actions';
import CheckoutForm from '@/components/checkout/CheckoutForm';

// Load Stripe (ensure env var exists)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_mock');

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');
  const [isInitializing, setIsInitializing] = useState(false);

  // Khmer Address State
  const [address, setAddress] = useState({
    street: '',
    houseNumber: '',
    village: '',
    commune: '',
    district: '',
    province: '',
    country: 'Cambodia'
  });
  
  const { items, getTotalPrice } = useCartStore();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login?redirect=/checkout');
    }
  }, [mounted, isAuthenticated, router]);

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || items.length === 0) return;

    setIsInitializing(true);
    setError('');
    
    try {
      const token = localStorage.getItem('accessToken');
      const data = await createPaymentIntentAction(items, token, {
        ...address,
        isDefault: false
      });
      setClientSecret(data.clientSecret);
      setOrderId(data.orderId);
    } catch (err: any) {
      console.error("Payment intent creation error:", err);
      setError(err.message || "Failed to initialize checkout. Please try again.");
    } finally {
      setIsInitializing(false);
    }
  };

  if (!mounted || !isAuthenticated) return <div className="min-h-screen flex items-center justify-center">Loading checkout...</div>;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-8">Add some items before checking out.</p>
        <Link href="/products" className="text-brand-600 font-bold hover:underline">Return to Shop</Link>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal > 49 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-brand-600">Kibble Checkout</Link>
          <div className="text-sm font-medium transition-colors cursor-pointer">Secure Payment powered by{" "}
            <a href="https://stripe.com/" target="_blank" className="text-brand-600 font-bold hover:underline">Stripe</a></div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
          {/* Checkout Form */}
          <div className="flex-1">
            {error && (
               <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 border border-red-200">
                 {error}
               </div>
            )}
            
            {clientSecret ? (
              <Elements options={{ clientSecret, appearance: { theme: 'stripe', variables: { colorPrimary: '#f97316' } } }} stripe={stripePromise}>
                <CheckoutForm clientSecret={clientSecret} orderId={orderId} />
              </Elements>
            ) : (
              <form onSubmit={handleAddressSubmit} className="bg-white/60 p-8 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">House Number</label>
                    <input type="text" value={address.houseNumber} onChange={e => setAddress({...address, houseNumber: e.target.value})} className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                    <input type="text" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Village <span className="text-red-500">*</span></label>
                    <input required type="text" value={address.village} onChange={e => setAddress({...address, village: e.target.value})} className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Commune <span className="text-red-500">*</span></label>
                    <input required type="text" value={address.commune} onChange={e => setAddress({...address, commune: e.target.value})} className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">District <span className="text-red-500">*</span></label>
                    <input required type="text" value={address.district} onChange={e => setAddress({...address, district: e.target.value})} className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Province <span className="text-red-500">*</span></label>
                    <input required type="text" value={address.province} onChange={e => setAddress({...address, province: e.target.value})} className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm" />
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <button type="submit" disabled={isInitializing} className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-700 transition-colors shadow-lg disabled:opacity-70 flex justify-center cursor-pointer">
                    {isInitializing ? 'Preparing Checkout...' : 'Proceed to Payment'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-96">
            <div className="bg-white/60 p-8 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <ul className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {items.map(item => (
                  <li key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative border border-gray-200">
                       <div className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs font-bold z-10">
                         {item.quantity}
                       </div>
                       {item.product.images?.[0] ? (
                         <div className="relative w-full h-full p-1">
                           <Image src={item.product.images[0]} alt={item.product.name} fill className="object-contain" sizes="64px" />
                         </div>
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-gray-300 text-xl">🐾</div>
                       )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">{item.product.name}</h4>
                      <p className="text-xs text-gray-500">{item.variant.size || item.variant.flavor}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900 flex items-center">
                      ${(item.variant.price * item.quantity).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 text-sm text-gray-600 mb-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (8%)</span>
                  <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-900 text-lg">Total</span>
                <span className="text-2xl font-bold text-brand-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

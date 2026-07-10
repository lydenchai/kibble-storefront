"use client";

import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store/useCartStore";

export default function CheckoutForm({ clientSecret, orderId }: { clientSecret: string, orderId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const clearCart = useCartStore(state => state.clearCart);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error) {
      setMessage(error.message || "An unexpected error occurred.");
      setIsProcessing(false);
    } else {
      // The user is automatically redirected to return_url, but just in case
      clearCart();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div className="bg-white/60 p-8 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Payment</h2>
        <PaymentElement />
        
        {message && (
          <div className="mt-4 p-4 rounded-lg bg-red-50 text-red-600 text-sm">
            {message}
          </div>
        )}
      </div>

      <button 
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-700 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}

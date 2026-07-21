"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

export default function ABAQRCode({ orderId, total }: { orderId: string, total: number }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const clearCart = useCartStore(state => state.clearCart);

  const handleConfirm = () => {
    setIsProcessing(true);
    clearCart();
    // Simulate slight delay before redirecting to success
    setTimeout(() => {
      router.push(`/checkout/success?orderId=${orderId}`);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-8 text-center flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Scan to Pay</h2>
      <p className="text-gray-600 mb-6">Please scan the ABA QR code below to complete your payment.</p>
      
      <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 shadow-sm inline-block">
        <div className="relative w-64 h-64 mb-4">
          <Image 
            src="https://placehold.co/400x400/004d99/white?text=ABA+QR+Code" 
            alt="ABA QR Code"
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 256px"
          />
        </div>
        <div className="text-xl font-bold text-gray-900 border-t pt-4 border-dashed border-gray-300">
          Total: ${total.toFixed(2)}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-6 max-w-md">
        Once you have completed the payment in your ABA app, please click the button below.
      </p>

      <button 
        onClick={handleConfirm}
        disabled={isProcessing}
        className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-700 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer max-w-sm"
      >
        {isProcessing ? 'Confirming...' : 'I Have Paid'}
      </button>
    </div>
  );
}

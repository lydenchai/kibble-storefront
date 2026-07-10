"use server";

import { CartItem } from "@/store/useCartStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function createPaymentIntentAction(items: CartItem[], token: string | null, shippingAddress: any) {
  if (!token) {
    throw new Error('You must be logged in to checkout');
  }

  // Map local cart items to the format expected by the backend
  const requestItems = items.map(item => ({
    productId: item.product._id,
    sku: item.variant.sku,
    quantity: item.quantity
  }));

  try {
    const res = await fetch(`${API_URL}/checkout/create-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        items: requestItems,
        shippingAddress
      })
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error?.message || 'Failed to create payment intent');
    }

    const data = await res.json();
    return data.data; // Should contain { clientSecret, orderId }
  } catch (error: any) {
    console.error("Failed to create payment intent:", error);
    throw error;
  }
}

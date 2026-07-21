"use server";

import { CartItem } from "@/store/useCartStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function createOrderAction(items: CartItem[], token: string | null, shippingAddress: any) {
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
        'Authorization': `Bearer ${token}`,
        'X-App-Type': 'storefront'
      },
      body: JSON.stringify({
        items: requestItems,
        shippingAddress
      })
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: error.error?.message || 'Failed to create order' };
    }

    const data = await res.json();
    return { data: data.data }; // Should contain { orderId }
  } catch (error: any) {
    console.error("Failed to create order:", error);
    return { error: error.message || 'Failed to create order' };
  }
}

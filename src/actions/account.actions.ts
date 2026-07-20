"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function fetchUserOrdersAction(page: number, limit: number, token: string | null) {
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/orders/my?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || "Failed to fetch orders");
  }

  return res.json();
}

export async function fetchWishlistAction(token: string | null) {
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/auth/wishlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    // Prevent caching to ensure wishlist is always up to date
    cache: 'no-store'
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || "Failed to fetch wishlist");
  }

  return res.json();
}

export async function toggleWishlistAction(productId: string, token: string | null) {
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/auth/wishlist/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || "Failed to toggle wishlist");
  }

  return res.json();
}

export async function updateProfileAction(data: any, token: string | null) {
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/auth/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || "Failed to update profile");
  }

  return res.json();
}

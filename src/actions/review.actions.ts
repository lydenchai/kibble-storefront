"use server";

import { ReviewItem } from "@/types/review-item";
import { ReviewStats } from "@/types/review-stat";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getProductReviewsAction(productId: string): Promise<{
  success: boolean;
  data?: {
    reviews: ReviewItem[];
    stats: ReviewStats;
  };
  error?: string;
}> {
  try {
    const res = await fetch(`${API_URL}/reviews/product/${productId}`, {
      next: { revalidate: 10 }
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { success: false, error: errorData.error?.message || "Failed to fetch reviews" };
    }

    return await res.json();
  } catch (error: any) {
    console.error("Error fetching product reviews:", error);
    return { success: false, error: error.message || "Network error" };
  }
}

export async function createReviewAction(
  productId: string,
  rating: number,
  comment: string,
  token: string | null
): Promise<{
  success: boolean;
  data?: ReviewItem;
  error?: string;
}> {
  if (!token) {
    return { success: false, error: "Please log in to leave a review." };
  }

  try {
    const res = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ productId, rating, comment })
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error?.message || "Failed to submit review" };
    }

    return data;
  } catch (error: any) {
    console.error("Error submitting review:", error);
    return { success: false, error: error.message || "Network error" };
  }
}

export async function getUserReviewStatusAction(
  productId: string,
  token: string | null
): Promise<{
  success: boolean;
  data?: {
    hasReviewed: boolean;
    review: ReviewItem | null;
  };
  error?: string;
}> {
  if (!token) {
    return { success: true, data: { hasReviewed: false, review: null } };
  }

  try {
    const res = await fetch(`${API_URL}/reviews/user-status/${productId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      return { success: true, data: { hasReviewed: false, review: null } };
    }

    return await res.json();
  } catch (error) {
    return { success: true, data: { hasReviewed: false, review: null } };
  }
}

export async function getFeaturedReviewsAction(limit = 6): Promise<{
  success: boolean;
  data?: ReviewItem[];
  error?: string;
}> {
  try {
    const res = await fetch(`${API_URL}/reviews/featured?limit=${limit}`, {
      next: { revalidate: 30 }
    });

    if (!res.ok) {
      return { success: false, error: "Failed to fetch featured reviews" };
    }

    return await res.json();
  } catch (error: any) {
    console.error("Error fetching featured reviews:", error);
    return { success: false, error: error.message || "Network error" };
  }
}

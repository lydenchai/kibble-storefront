"use server";

import { PaginatedResponse } from "@/types/api";
import { Product } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getProductsAction(searchParams?: { [key: string]: string | string[] | undefined }): Promise<PaginatedResponse<Product>> {
  const url = new URL(`${API_URL}/products`);
  
  if (searchParams) {
    if (searchParams.category) url.searchParams.append('category', searchParams.category as string);
    if (searchParams.petType) url.searchParams.append('petType', searchParams.petType as string);
    if (searchParams.search) url.searchParams.append('search', searchParams.search as string);
    if (searchParams.sort) url.searchParams.append('sort', searchParams.sort as string);
    if (searchParams.page) url.searchParams.append('page', searchParams.page as string);
    if (searchParams.limit) url.searchParams.append('limit', searchParams.limit as string);
  }
  
  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 } // It is fine to keep cache options in fetch inside an action if it's called from RSC
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return await res.json() as PaginatedResponse<Product>;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { data: [], pagination: { total: 0, page: 1, limit: 12, pages: 0 } };
  }
}

export async function getProductBySlugAction(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${slug}`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch product');
    }
    
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

import { Variant } from "./variant";

export interface CategoryRef {
  _id: string;
  name?: string;
  slug?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string | CategoryRef;
  brand: string;
  images: string[];
  variants: Variant[];
  petType: "dog" | "cat" | "bird" | "small-pet" | "fish" | "reptile" | "other";
  tags: string[];
  ratingAvg: number;
  ratingCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OfferProduct extends Product {
  discountPercentage?: number;
  savingsAmount?: number;
}

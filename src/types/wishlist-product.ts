export interface WishlistProduct {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  images: string[];
  variants: { price: number; compareAtPrice?: number; stock: number }[];
}

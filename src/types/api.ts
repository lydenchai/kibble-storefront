export interface Variant {
  _id: string;
  size?: string;
  weight?: string;
  flavor?: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: any; // Ideally this should be a populated Category object or ID
  brand: string;
  images: string[];
  variants: Variant[];
  petType: 'dog' | 'cat' | 'bird' | 'small-pet' | 'fish' | 'reptile' | 'other';
  tags: string[];
  ratingAvg: number;
  ratingCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

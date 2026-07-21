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

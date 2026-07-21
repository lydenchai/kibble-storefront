export interface OrderItem {
  product: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  image?: string;
  slug?: string;
}

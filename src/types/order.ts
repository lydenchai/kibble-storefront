import { Address } from "./address";
import { OrderItem } from "./order-item";

export interface Order {
  _id: string;
  items: OrderItem[];
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  createdAt: string;
  shippingAddress: Address;
  trackingNumber?: string;
  courier?: string;
  trackingUrl?: string;
}

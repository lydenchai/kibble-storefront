import { Product } from "./product";
import { Variant } from "./variant";

export interface CartItem {
  id: string; // Unique ID for the cart line item (could be variant.sku)
  product: Product;
  variant: Variant;
  quantity: number;
}

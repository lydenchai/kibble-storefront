import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Variant } from '@/types/api';

export interface CartItem {
  id: string; // Unique ID for the cart line item (could be variant.sku)
  product: Product;
  variant: Variant;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, variant: Variant, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, variant, quantity) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.variant.sku === variant.sku
          );

          if (existingItemIndex >= 0) {
            // Update quantity if item already exists
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems };
          }

          // Add new item
          return {
            items: [
              ...state.items,
              {
                id: variant.sku,
                product,
                variant,
                quantity,
              },
            ],
          };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.variant.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'kibble-cart-storage', // name of the item in the storage (must be unique)
    }
  )
);

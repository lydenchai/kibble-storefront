import { CartState } from "@/types/store";
import { CartItem } from "@/types/cart-item";
export type { CartItem };
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      addItem: (product, variant, quantity) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.variant.sku === variant.sku,
          );

          let newItems: CartItem[];
          if (existingItemIndex >= 0) {
            newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
          } else {
            newItems = [
              ...state.items,
              {
                id: variant.sku,
                product,
                variant,
                quantity,
              },
            ];
          }

          return { items: newItems };
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
            item.id === id
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
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
          0,
        );
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }), // don't persist isCartOpen
    },
  ),
);

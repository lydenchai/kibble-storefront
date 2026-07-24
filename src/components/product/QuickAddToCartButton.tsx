"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

export default function QuickAddToCartButton({ product }: { product: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if wrapped in Link
    e.stopPropagation();

    const user = useAuthStore.getState().user;
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!product.variants || product.variants.length === 0) return;

    // Add default variant (index 0)
    const variant = product.variants[0];
    if (!variant) return;

    addItem(product, variant, 1);

    setIsAdded(true);
    toast.success(`Added ${product.name} to cart`);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`p-2 rounded-full flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50 ${
        isAdded
          ? "bg-green-500 text-white"
          : "bg-brand-50 text-brand-600 hover:bg-brand-600 hover:text-white"
      }`}
      title="Add to Cart"
    >
      {isAdded ? (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        // <span className="text-xl leading-none font-medium pb-[2px]">+</span>
        <ShoppingCart className="h-5 w-5" />
      )}
    </button>
  );
}

'use client';

import Image from "next/image";
import Link from "next/link"; 
import { useTranslation } from "@/hooks/useTranslation";
import QuickAddToCartButton from "@/components/product/QuickAddToCartButton";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
  const lowestPrice = product.variants?.length > 0 
    ? Math.min(...product.variants.map((v: any) => v.price)) 
    : 0;

  return (
    <div className="group flex flex-col h-full bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
      <Link href={`/products/${product.slug}`} className="relative aspect-[4/3] bg-gray-50 overflow-hidden rounded-t-2xl">
        {product.images?.[0] ? (
          <Image 
            src={product.images[0]} 
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">
            <span className="text-4xl">🐾</span>
          </div>
        )}
        {product.variants?.[0]?.compareAtPrice && product.variants[0]?.compareAtPrice > product.variants[0]?.price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {t('home.sale')}
          </div>
        )}
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs text-brand-600 font-medium mb-1 uppercase tracking-wider">{product.brand}</div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">{product.name}</h3>
        </Link>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900">${lowestPrice.toFixed(2)}</div>
          <QuickAddToCartButton product={product as any} />
        </div>
      </div>
    </div>
  );
}

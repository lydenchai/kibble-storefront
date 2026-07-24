"use client";

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { getProductsAction } from '@/actions/product.actions';
import { Product } from '@/types/product';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface RelatedProductsProps {
  currentProductId: string;
  categorySlug?: string;
  petType?: string;
}

export default function RelatedProducts({ currentProductId, categorySlug, petType }: RelatedProductsProps) {
  const { t } = useTranslation();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRelated() {
      setLoading(true);
      try {
        const queryParams: Record<string, string> = { limit: '8' };
        if (categorySlug) queryParams.category = categorySlug;
        if (petType) queryParams.petType = petType;

        let res = await getProductsAction(queryParams);
        let items = res.data.filter((p) => p._id !== currentProductId);

        // Fallback: if category filter produced fewer than 4 items, try with just petType or general
        if (items.length < 4) {
          const fallbackRes = await getProductsAction({ petType: petType || '', limit: '8' });
          const combined = [...items, ...fallbackRes.data.filter((p) => p._id !== currentProductId)];
          // Unique items by _id
          const uniqueMap = new Map();
          combined.forEach((item) => uniqueMap.set(item._id, item));
          items = Array.from(uniqueMap.values());
        }

        setRelatedProducts(items.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRelated();
  }, [currentProductId, categorySlug, petType]);

  if (!loading && relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="h-7 w-7 text-amber-500" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t('product.relatedProducts') || 'You Might Also Like'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Hand-picked items tailored for your companion
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((prod) => (
            <ProductCard key={prod._id} product={prod} />
          ))}
        </div>
      )}
    </section>
  );
}

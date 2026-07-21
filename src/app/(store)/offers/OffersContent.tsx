"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import ProductCard from "@/components/ui/ProductCard";
import { useTranslation } from "@/hooks/useTranslation";

type OffersContentProps = {
  offerProducts: any[];
};

export default function OffersContent({ offerProducts }: OffersContentProps) {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-red-50 rounded-3xl p-8 md:p-12 text-center mb-16 border border-red-100">
        <h1 className="text-4xl font-bold text-red-700 mb-4">{t('offers.title')}</h1>
        <p className="text-lg text-red-600 max-w-2xl mx-auto">
          {t('offers.subtitle')}
        </p>
      </div>

      {offerProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerProducts.map((product, index) => (
            <FadeIn key={product._id} delay={index * 0.1}>
              <ProductCard product={product as any} />
            </FadeIn>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <div className="text-4xl mb-4">🏷️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('offers.emptyTitle')}</h3>
          <p className="text-gray-500">{t('offers.emptyDesc')}</p>
          <Link href="/products" className="inline-block mt-6 px-6 py-2 bg-brand-50 text-brand-600 font-medium rounded-lg hover:bg-brand-100 transition-colors">
            {t('offers.shopAll')}
          </Link>
        </div>
      )}
    </div>
  );
}

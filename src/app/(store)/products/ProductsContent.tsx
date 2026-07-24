"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import ProductFilters from "@/components/product/ProductFilters";
import { FadeIn } from "@/components/ui/FadeIn";
import ProductCard from "@/components/ui/ProductCard";
import CustomSelect from "@/components/ui/CustomSelect";
import { useTranslation } from "@/hooks/useTranslation";
import { buildUrlWithParams } from "@/utils/url";

type ProductsContentProps = {
  products: any[];
  total: number;
  page: number;
  pages: number;
  resolvedParams: any;
  limit: string;
};

export default function ProductsContent({
  products,
  total,
  page,
  pages,
  resolvedParams,
  limit
}: ProductsContentProps) {
  const { t } = useTranslation();
  const router = useRouter();

  const currentSort = (resolvedParams?.sort as string) || '-createdAt';

  const sortOptions = [
    { value: '-createdAt', label: t('products.sortNewest') || 'Newest Arrivals' },
    { value: 'price', label: t('products.sortPriceAsc') || 'Price: Low to High' },
    { value: '-price', label: t('products.sortPriceDesc') || 'Price: High to Low' },
    { value: '-ratingAvg', label: t('products.sortRating') || 'Highest Rated' },
  ];

  const handleSortChange = (newSort: string) => {
    router.push(buildUrlWithParams('/products', resolvedParams, { sort: newSort, page: 1 }));
  };

  const buildPageUrl = (targetPage: number) => {
    return buildUrlWithParams('/products', resolvedParams, { limit, page: targetPage });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('products.title')}</h1>
        <p className="text-gray-600">{t('products.subtitle')}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <ProductFilters />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="text-sm text-gray-600">
              {t('products.showing')} <span className="font-medium text-gray-900">{products.length}</span> {t('products.of')} <span className="font-medium text-gray-900">{total}</span> {t('products.products')}
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-600">{t('products.sortBy')}</label>
              <CustomSelect
                id="sort"
                options={sortOptions}
                value={currentSort}
                onChange={handleSortChange}
                ariaLabel="Sort products"
              />
            </div>
          </div>

          {/* Product Grid */}
          {products.length > 0 ? (
            <FadeIn key={products.length} delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product as any} />
                ))}
              </div>
            </FadeIn>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('products.notFoundTitle')}</h3>
              <p className="text-gray-500">{t('products.notFoundDesc')}</p>
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <nav aria-label="Product pagination" className="flex justify-center items-center mt-12 gap-2 flex-wrap">
              <Link
                href={buildPageUrl(page - 1)}
                aria-disabled={page === 1}
                className={`px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium transition-colors ${
                  page === 1
                    ? 'pointer-events-none text-gray-300 border-gray-100'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t('products.prev')}
              </Link>

              {Array.from({ length: pages }, (_, i) => i + 1).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={buildPageUrl(pageNum)}
                  aria-current={page === pageNum ? 'page' : undefined}
                  className={`w-10 h-10 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${
                    page === pageNum
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </Link>
              ))}

              <Link
                href={buildPageUrl(page + 1)}
                aria-disabled={page === pages}
                className={`px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium transition-colors ${
                  page === pages
                    ? 'pointer-events-none text-gray-300 border-gray-100'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t('products.next')}
              </Link>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

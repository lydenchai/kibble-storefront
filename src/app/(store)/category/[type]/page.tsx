import Image from "next/image";
import Link from "next/link";
import { getProductsAction } from "@/actions/product.actions";

export const dynamic = 'force-dynamic';

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { type } = await params;
  const resolvedParams = await searchParams;

  // Clamp limit to 6 so the 3-col grid fills 2 rows and pagination kicks in
  const limit = (resolvedParams.limit as string) || '6';
  const response = await getProductsAction({ ...resolvedParams, petType: type, limit });
  const products = response.data;
  const { total, page, pages } = response.pagination;

  const titleCaseType = type.charAt(0).toUpperCase() + type.slice(1);

  // Build a URL with updated ?page=N while preserving other params
  const buildPageUrl = (targetPage: number) => {
    const urlParams = new URLSearchParams();
    Object.entries(resolvedParams).forEach(([key, val]) => {
      if (key !== 'page' && val) urlParams.set(key, val as string);
    });
    urlParams.set('limit', limit);
    urlParams.set('page', String(targetPage));
    return `/category/${type}?${urlParams.toString()}`;
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{titleCaseType} Supplies</h1>
        <p className="text-gray-600">Everything you need for your beloved {type}.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white/60 p-6 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 sticky top-24">
            <h2 className="font-semibold text-gray-900 mb-4 pb-4 border-b border-gray-100">Filters</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
                  {['Food', 'Treats', 'Toys', 'Accessories', 'Health'].map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-300 text-brand-600 focus:ring-brand-500" />
                      <span className="text-sm text-gray-600">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 py-2 bg-brand-50 text-brand-600 font-medium rounded-lg hover:bg-brand-100 transition-colors cursor-pointer">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium text-gray-900">{products.length}</span> of <span className="font-medium text-gray-900">{total}</span> products
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-category" className="text-sm text-gray-600">Sort by:</label>
              <select 
                id="sort-category" 
                className="text-sm border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                defaultValue="-createdAt"
              >
                <option value="-createdAt">Newest Arrivals</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-ratingAvg">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => {
                const lowestPrice = product.variants?.length > 0 
                  ? Math.min(...product.variants.map(v => v.price)) 
                  : 0;

                return (
                  <div key={product._id} className="group flex flex-col bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 hover:shadow-lg transition-all duration-300">
                    <Link href={`/products/${product.slug}`} className="relative aspect-[4/3] bg-gray-50 overflow-hidden rounded-t-2xl">
                      {product.images?.[0] ? (
                        <Image 
                          src={product.images[0]} 
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">
                          <span className="text-4xl">🐾</span>
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
                        <button className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors cursor-pointer">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">We couldn&apos;t find any products for {type}.</p>
            </div>
          )}

          {/* Pagination — always render when there is more than one page */}
          {pages > 1 && (
            <nav aria-label="Category product pagination" className="flex justify-center items-center mt-12 gap-2 flex-wrap">
              <Link
                href={buildPageUrl(page - 1)}
                aria-disabled={page === 1}
                className={`px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium transition-colors ${
                  page === 1
                    ? 'pointer-events-none text-gray-300 border-gray-100'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                ← Previous
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
                Next →
              </Link>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { getProductsAction } from "@/actions/product.actions";

export const dynamic = 'force-dynamic';

export default async function OffersPage() {
  // Fetch a list of products, maybe sorted by price or newest, and filter those on sale
  const response = await getProductsAction({ limit: '50' }); // Fetch more to find offers
  
  // An offer is where the first variant has compareAtPrice > price
  const offerProducts = response.data.filter(product => {
    const mainVariant = product.variants?.[0];
    return mainVariant?.compareAtPrice && mainVariant.compareAtPrice > mainVariant.price;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-red-50 rounded-3xl p-8 md:p-12 text-center mb-16 border border-red-100">
        <h1 className="text-4xl font-bold text-red-700 mb-4">Special Offers</h1>
        <p className="text-lg text-red-600 max-w-2xl mx-auto">
          Save big on premium pet supplies! Discover our limited-time deals on food, toys, and accessories for your furry friends.
        </p>
      </div>

      {offerProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerProducts.map((product) => {
            const mainVariant = product.variants?.[0];
            const lowestPrice = mainVariant?.price || 0;
            const originalPrice = mainVariant?.compareAtPrice || 0;
            const savePercent = Math.round(((originalPrice - lowestPrice) / originalPrice) * 100);

            return (
              <div key={product._id} className="group flex flex-col bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 hover:shadow-lg transition-all duration-300 relative">
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                  SAVE {savePercent}%
                </div>
                
                <Link href={`/products/${product.slug}`} className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
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
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs text-brand-600 font-medium mb-1 uppercase tracking-wider">{product.brand}</div>
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">{product.name}</h3>
                  </Link>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-red-600 mr-2">${lowestPrice.toFixed(2)}</span>
                      <span className="text-sm text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
                    </div>
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
          <div className="text-4xl mb-4">🏷️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No offers currently available</h3>
          <p className="text-gray-500">Check back later for new deals and discounts.</p>
          <Link href="/products" className="inline-block mt-6 px-6 py-2 bg-brand-50 text-brand-600 font-medium rounded-lg hover:bg-brand-100 transition-colors">
            Shop All Products
          </Link>
        </div>
      )}
    </div>
  );
}

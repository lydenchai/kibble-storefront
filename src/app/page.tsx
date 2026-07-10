import Image from "next/image";
import Link from "next/link";
import { getProductsAction } from "@/actions/product.actions";

export default async function Home() {
  const response = await getProductsAction({ limit: '4', sort: '-createdAt' });
  const featuredProducts = response.data || [];

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-brand-50 pt-16 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Premium Nutrition for Your Best Friend
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              Discover our carefully curated selection of high-quality pet food, treats, and accessories. Because they deserve the best.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/category/dog" className="px-8 py-3 bg-brand-600 text-white font-medium rounded-full hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30">
                Shop Dog
              </Link>
              <Link href="/category/cat" className="px-8 py-3 bg-white text-brand-600 font-medium rounded-full hover:bg-brand-50 transition-colors shadow-lg shadow-gray-200/50">
                Shop Cat
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-35 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { name: "Dog Food", href: "/category/dog?type=food", icon: "🦴", color: "bg-orange-100" },
            { name: "Cat Food", href: "/category/cat?type=food", icon: "🐟", color: "bg-teal-100" },
            { name: "Treats", href: "/category/all?type=treats", icon: "🍖", color: "bg-yellow-100" },
            { name: "Accessories", href: "/category/all?type=accessories", icon: "🎾", color: "bg-purple-100" },
          ].map((cat) => (
            <Link key={cat.name} href={cat.href} className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
              <div className={`w-16 h-16 ${cat.color} rounded-full flex items-center justify-center text-3xl mb-4`}>
                {cat.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <Link href="/products" className="text-brand-600 font-medium hover:text-brand-700 transition-colors">
            View all &rarr;
          </Link>
        </div>
        
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              const lowestPrice = product.variants.length > 0 
                ? Math.min(...product.variants.map(v => v.price)) 
                : 0;

              return (
                <div key={product._id} className="group flex flex-col bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 hover:shadow-lg transition-all duration-300">
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
                    {product.variants[0]?.compareAtPrice && product.variants[0]?.compareAtPrice > product.variants[0]?.price && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        SALE
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
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500 mb-4">No featured products available at the moment.</p>
            <p className="text-sm text-gray-400">Make sure the API server is running.</p>
          </div>
        )}
      </section>

      {/* Value Proposition */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
        <div className="bg-brand-900 rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full mix-blend-screen filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-700 rounded-full mix-blend-screen filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Subscribe & Save 15%</h2>
          <p className="text-brand-100 mb-8 max-w-2xl mx-auto relative z-10 text-lg">
            Never run out of your pet's favorite food again. Set up a subscription and enjoy regular deliveries with an exclusive discount.
          </p>
          <button className="relative z-10 px-8 py-3 bg-white text-brand-900 font-bold rounded-full hover:bg-brand-50 transition-colors shadow-xl cursor-pointer">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
}

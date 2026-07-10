import Link from "next/link";
import Image from "next/image";

export default function BrandsPage() {
  const popularBrands = [
    { name: "Royal Canin", logo: "🐾" },
    { name: "Purina Pro Plan", logo: "🐕" },
    { name: "Hill's Science Diet", logo: "🔬" },
    { name: "Blue Buffalo", logo: "🐃" },
    { name: "Orijen", logo: "🦅" },
    { name: "Taste of the Wild", logo: "🌲" },
    { name: "Wellness", logo: "🌿" },
    { name: "Merrick", logo: "🥩" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Top Brands We Carry</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We partner with the best pet food and accessory brands to ensure your furry friends get the highest quality products available.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {popularBrands.map((brand) => (
          <Link 
            key={brand.name} 
            href={`/products?brand=${encodeURIComponent(brand.name)}`}
            className="group flex flex-col items-center justify-center p-8 bg-white/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 hover:shadow-md hover:border-brand-200 transition-all"
          >
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform">
              {brand.logo}
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors text-center">
              {brand.name}
            </h3>
          </Link>
        ))}
      </div>

      <div className="mt-20 bg-brand-50 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold text-brand-900 mb-4">Don't see your favorite brand?</h2>
        <p className="text-brand-700 mb-8">
          We are constantly expanding our catalog. Let us know what brands you'd love to see!
        </p>
        <Link href="/contact" className="inline-block px-8 py-3 bg-brand-600 text-white font-medium rounded-full hover:bg-brand-700 transition-colors">
          Contact Us
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import ClientTranslate from "@/components/ui/ClientTranslate";

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
        <h1 className="text-4xl font-bold text-gray-900 mb-4"><ClientTranslate translationKey="brands.title" /></h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          <ClientTranslate translationKey="brands.subtitle" />
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {popularBrands.map((brand) => (
          <FadeIn key={brand.name} delay={0.1}>
            <Link 
              key={brand.name} 
              href={`/products?brand=${encodeURIComponent(brand.name)}`}
              className="group flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-gray-100 hover:border-brand-200 transition-all"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform">
                {brand.logo}
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors text-center">
                {brand.name}
              </h3>
            </Link>
          </FadeIn>
        ))}
      </div>

      <div className="mt-20 bg-brand-50 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold text-brand-900 mb-4"><ClientTranslate translationKey="brands.missingTitle" /></h2>
        <p className="text-brand-700 mb-8">
          <ClientTranslate translationKey="brands.missingDesc" />
        </p>
        <Link href="/contact" className="inline-block px-8 py-3 bg-brand-600 text-white font-medium rounded-full hover:bg-brand-700 transition-colors">
          <ClientTranslate translationKey="brands.contactUs" />
        </Link>
      </div>
    </div>
  );
}

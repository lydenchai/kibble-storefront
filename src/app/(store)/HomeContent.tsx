'use client';

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { useTranslation } from "@/hooks/useTranslation";
import ProductCard from "@/components/ui/ProductCard";

export default function HomeContent({ featuredProducts }: { featuredProducts: any[] }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-brand-50 pt-16 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {t('home.heroTitle')}
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-xl">
              {t('home.heroDesc')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/category/dog" className="px-8 py-3 bg-brand-600 text-white font-medium rounded-full hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30">
                {t('home.shopDog')}
              </Link>
              <Link href="/category/cat" className="px-8 py-3 bg-white text-brand-600 font-medium rounded-full hover:bg-brand-50 transition-colors shadow-lg shadow-gray-200/50">
                {t('home.shopCat')}
              </Link>
            </div>
          </FadeIn>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-35 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { nameKey: "home.catDogFood", href: "/category/dog?type=food", icon: "🦴", color: "bg-orange-100" },
            { nameKey: "home.catCatFood", href: "/category/cat?type=food", icon: "🐟", color: "bg-teal-100" },
            { nameKey: "home.catTreats", href: "/category/all?type=treats", icon: "🍖", color: "bg-yellow-100" },
            { nameKey: "home.catAccessories", href: "/category/all?type=accessories", icon: "🎾", color: "bg-purple-100" },
          ].map((cat, index) => (
            <FadeIn key={cat.href} delay={index * 0.1}>
              <Link href={cat.href} className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-100">
                <div className={`w-16 h-16 ${cat.color} rounded-full flex items-center justify-center text-3xl mb-4`}>
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{t(cat.nameKey)}</h3>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <FadeIn direction="left" className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{t('home.featuredProducts')}</h2>
          <Link href="/products" className="text-brand-600 font-medium hover:text-brand-700 transition-colors">
            {t('general.viewAll')} &rarr;
          </Link>
        </FadeIn>
        
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <FadeIn key={product._id} delay={index * 0.1}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-gray-500 mb-4">{t('general.noData')}</p>
          </div>
        )}
      </section>

      {/* Value Proposition */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
        <FadeIn className="bg-brand-900 rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full mix-blend-screen filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-700 rounded-full mix-blend-screen filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Subscribe & Save 15%</h2>
          <p className="text-brand-100 mb-8 max-w-2xl mx-auto relative z-10 text-lg">
            Never run out of your pet's favorite food again. Set up a subscription and enjoy regular deliveries with an exclusive discount.
          </p>
          <button className="relative z-10 px-8 py-3 bg-white text-brand-900 font-bold rounded-full hover:bg-brand-50 transition-colors shadow-xl cursor-pointer">
            Learn More
          </button>
        </FadeIn>
      </section>
    </div>
  );
}

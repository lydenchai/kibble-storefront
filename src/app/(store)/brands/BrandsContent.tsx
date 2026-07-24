"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Sparkles, ArrowRight, Award, PackageCheck } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';
import { useTranslation } from '@/hooks/useTranslation';

export interface BrandItem {
  name: string;
  count: number;
  featured?: boolean;
}

const ALPHABET = ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const brandGradients = [
  "from-amber-500 to-orange-600",
  "from-brand-500 to-brand-700",
  "from-sky-500 to-indigo-600",
  "from-emerald-500 to-teal-700",
  "from-purple-500 to-pink-600",
  "from-rose-500 to-red-600",
  "from-blue-500 to-cyan-600",
  "from-yellow-500 to-amber-600"
];

interface BrandsContentProps {
  brands: BrandItem[];
}

export default function BrandsContent({ brands }: BrandsContentProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('ALL');

  // Filter brands based on search input & alphabet filter
  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
      const matchesLetter =
        selectedLetter === 'ALL' ||
        brand.name.toUpperCase().startsWith(selectedLetter);
      return matchesSearch && matchesLetter;
    });
  }, [brands, searchTerm, selectedLetter]);

  // Featured brand (highest product count or first featured)
  const featuredBrand = useMemo(() => {
    return brands.find((b) => b.featured) || brands[0] || { name: 'Royal Canin', count: 24 };
  }, [brands]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-3 border border-brand-100">
          <Award className="h-3.5 w-3.5 text-brand-600" />
          Certified Premium Brands
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          {t('brands.title') || 'Trusted Pet Nutrition & Supplies Brands'}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          {t('brands.subtitle') || 'Explore our hand-picked collection of world-class, vet-recommended pet food and supply brands.'}
        </p>
      </div>

      {/* Featured Brand Spotlight Card */}
      {featuredBrand && (
        <FadeIn className="mb-14">
          <div className="relative bg-gradient-to-r from-brand-900 via-brand-800 to-amber-900 rounded-3xl p-8 sm:p-12 text-white overflow-hidden shadow-xl border border-white/10">
            {/* Background Glow Blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500 rounded-full mix-blend-screen filter blur-3xl opacity-25 translate-y-1/3 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-400/30">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" /> Brand Spotlight
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                  {featuredBrand.name}
                </h2>
                <p className="text-brand-100 text-sm sm:text-base leading-relaxed mb-6">
                  Tailored nutrition formulas crafted with organic ingredients to keep your pets thriving at every stage of life.
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <Link
                    href={`/products?brand=${encodeURIComponent(featuredBrand.name)}`}
                    className="px-8 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 font-bold rounded-full hover:from-amber-300 hover:to-orange-400 transition-all duration-300 shadow-lg flex items-center gap-2 group cursor-pointer"
                  >
                    <span>Shop {featuredBrand.name}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-xs text-brand-200 font-medium flex items-center gap-1.5 bg-white/10 px-4 py-3 rounded-full backdrop-blur-xs border border-white/10">
                    <PackageCheck className="h-4 w-4 text-emerald-400" />
                    {featuredBrand.count} Available Products
                  </span>
                </div>
              </div>

              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl sm:text-5xl font-black text-amber-300 shadow-2xl shrink-0">
                {featuredBrand.name.slice(0, 2).toUpperCase()}
              </div>
            </div>
          </div>
        </FadeIn>
      )}

      {/* Filter & Search Bar Toolbar */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs mb-10 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search brand name..."
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white text-gray-900 transition-all"
            />
          </div>

          <div className="text-xs text-gray-500 font-medium">
            Showing <span className="font-bold text-gray-900">{filteredBrands.length}</span> of{' '}
            <span className="font-bold text-gray-900">{brands.length}</span> Brands
          </div>
        </div>

        {/* Alphabet Jump Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
          {ALPHABET.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer shrink-0 ${
                selectedLetter === letter
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Brands Grid */}
      {filteredBrands.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBrands.map((brand, idx) => (
            <FadeIn key={brand.name} delay={(idx % 8) * 0.05}>
              <Link
                href={`/products?brand=${encodeURIComponent(brand.name)}`}
                className="group flex flex-col items-center justify-between p-7 bg-white rounded-2xl border border-gray-100 hover:border-brand-300 hover:shadow-lg transition-all duration-300 h-full relative overflow-hidden text-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-5 rounded-2xl bg-gradient-to-br shadow-md flex items-center justify-center text-white font-extrabold text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300 shrink-0" style={{ background: `linear-gradient(135deg, ${idx % 2 === 0 ? '#ea580c, #f59e0b' : '#0284c7, #6366f1'})` }}>
                  {brand.name.slice(0, 2).toUpperCase()}
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors text-base sm:text-lg mb-1">
                    {brand.name}
                  </h3>
                  <span className="inline-block text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full group-hover:bg-brand-50 group-hover:text-brand-700 transition-colors">
                    {brand.count} Product{brand.count !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-1 text-xs font-bold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View Collection</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No Brands Found</h3>
          <p className="text-gray-500 text-sm mb-6">
            We couldn&apos;t find any brand matching &ldquo;{searchTerm || selectedLetter}&rdquo;.
          </p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedLetter('ALL'); }}
            className="px-6 py-2.5 bg-brand-50 text-brand-600 font-semibold text-sm rounded-full hover:bg-brand-100 transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Suggest Brand CTA */}
      <div className="mt-20 bg-gradient-to-r from-brand-50 via-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 text-center border border-brand-100 shadow-xs">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          {t('brands.missingTitle') || "Can't find your favorite brand?"}
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
          {t('brands.missingDesc') || "We are constantly expanding our partner brand list. Let us know what brand your pet loves!"}
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3.5 bg-brand-600 text-white font-bold rounded-full hover:bg-brand-700 transition-colors shadow-md text-sm"
        >
          {t('brands.contactUs') || 'Suggest a Brand'}
        </Link>
      </div>
    </div>
  );
}

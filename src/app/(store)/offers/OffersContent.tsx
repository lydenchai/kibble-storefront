"use client";

import { useState, useMemo, useCallback } from 'react';
import { Tag, Copy, Check, Flame, Percent, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import { FadeIn } from '@/components/ui/FadeIn';
import ProductCard from '@/components/ui/ProductCard';
import CustomSelect from '@/components/ui/CustomSelect';
import { useTranslation } from '@/hooks/useTranslation';
import { OfferProduct } from '@/types/product';

type FilterType = 'all' | '20plus' | '30plus' | 'under20';

interface OffersContentProps {
  offerProducts: OfferProduct[];
}

const COUPON_CODE = 'KIBBLE15';

const FILTER_TABS: Array<{ id: FilterType; label: string }> = [
  { id: 'all', label: 'All Deals' },
  { id: '20plus', label: '🔥 20%+ Off' },
  { id: '30plus', label: '⚡ 30%+ Off' },
  { id: 'under20', label: '🏷️ Under $20' },
];

export default function OffersContent({ offerProducts }: OffersContentProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<string>('discount');

  const handleCopyCoupon = useCallback(() => {
    navigator.clipboard.writeText(COUPON_CODE);
    setCopied(true);
    toast.success(`Coupon code ${COUPON_CODE} copied to clipboard!`);
    setTimeout(() => setCopied(false), 2500);
  }, []);

  const filteredAndSortedOffers = useMemo(() => {
    let result = [...offerProducts];

    // Filter
    if (activeFilter === '20plus') {
      result = result.filter((p) => (p.discountPercentage || 0) >= 20);
    } else if (activeFilter === '30plus') {
      result = result.filter((p) => (p.discountPercentage || 0) >= 30);
    } else if (activeFilter === 'under20') {
      result = result.filter((p) => (p.variants?.[0]?.price || 0) <= 20);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'discount') return (b.discountPercentage || 0) - (a.discountPercentage || 0);
      if (sortBy === 'price-asc') return (a.variants?.[0]?.price || 0) - (b.variants?.[0]?.price || 0);
      if (sortBy === 'price-desc') return (b.variants?.[0]?.price || 0) - (a.variants?.[0]?.price || 0);
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });

    return result;
  }, [offerProducts, activeFilter, sortBy]);

  const sortOptions = useMemo(() => [
    { value: 'discount', label: 'Highest Discount (%)' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Offers' },
  ], []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Offer Banner */}
      <div className="relative bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-3xl p-8 sm:p-12 text-white mb-12 shadow-xl overflow-hidden border border-red-400/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-xs border border-white/20">
              <Flame className="h-4 w-4 text-amber-300 fill-amber-300" /> Flash Sale & Exclusive Offers
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              {t('offers.title') || 'Special Pet Care Deals & Discount Bundles'}
            </h1>
            <p className="text-red-100 text-sm sm:text-base leading-relaxed">
              {t('offers.subtitle') || 'Save big on premium pet food, tasty treats, and top accessories with our limited-time price drops.'}
            </p>
          </div>

          {/* Promo Coupon Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl flex flex-col items-center text-center shrink-0 w-full sm:w-auto min-w-[280px]">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
              <Tag className="h-4 w-4" /> Extra 15% Off Your Order
            </div>
            <p className="text-xs text-white/80 mb-3">Use code at checkout</p>
            <div className="flex items-center gap-2 bg-white text-gray-900 rounded-xl p-1.5 pl-4 border border-white shadow-inner w-full justify-between">
              <span className="font-mono font-extrabold text-lg text-red-600 tracking-wider">
                {COUPON_CODE}
              </span>
              <button
                onClick={handleCopyCoupon}
                type="button"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar: Filter Tabs & Sort Dropdown */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          <div className="flex items-center gap-1 text-xs text-gray-400 font-semibold mr-2 shrink-0">
            <Filter size={14} /> Filter:
          </div>
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <label htmlFor="offer-sort" className="text-xs font-semibold text-gray-500">
            Sort Offers:
          </label>
          <CustomSelect
            id="offer-sort"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            ariaLabel="Sort offers"
          />
        </div>
      </div>

      {/* Offers Product Grid */}
      {filteredAndSortedOffers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedOffers.map((product, index) => (
            <FadeIn key={product._id} delay={(index % 4) * 0.08}>
              <div className="relative group">
                {product.discountPercentage ? (
                  <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                    <Percent className="h-3.5 w-3.5" />
                    <span>SAVE {product.discountPercentage}% OFF</span>
                  </div>
                ) : null}
                <ProductCard product={product} />
              </div>
            </FadeIn>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8">
          <div className="text-5xl mb-4">🏷️</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t('offers.emptyTitle') || 'No Discounted Items Match This Filter'}
          </h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
            {t('offers.emptyDesc') || 'Try resetting your filter options to discover all available pet care deals.'}
          </p>
          <button
            onClick={() => setActiveFilter('all')}
            className="px-6 py-3 bg-red-600 text-white font-bold text-sm rounded-full hover:bg-red-700 transition-colors shadow-md cursor-pointer"
          >
            Reset Deal Filters
          </button>
        </div>
      )}
    </div>
  );
}

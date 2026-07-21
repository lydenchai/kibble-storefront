"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const PET_TYPES = [
  { labelKey: 'filters.dog', value: 'dog' },
  { labelKey: 'filters.cat', value: 'cat' },
  { labelKey: 'filters.bird', value: 'bird' },
  { labelKey: 'filters.fish', value: 'fish' },
  { labelKey: 'filters.smallPet', value: 'small-pet' }
];

const CATEGORIES = [
  { labelKey: 'filters.food', value: 'food' },
  { labelKey: 'filters.treats', value: 'treats' },
  { labelKey: 'filters.toys', value: 'toys' },
  { labelKey: 'filters.accessories', value: 'accessories' },
  { labelKey: 'filters.health', value: 'health' }
];

export default function ProductFilters({ hidePetType = false }: { hidePetType?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Parse initial state from URL
  const initialPetTypes = searchParams.get('petType')?.split(',') || [];
  const initialCategories = searchParams.get('category')?.split(',') || [];

  const { t } = useTranslation();

  const [selectedPetTypes, setSelectedPetTypes] = useState<string[]>(initialPetTypes);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);

  const togglePetType = (value: string) => {
    setSelectedPetTypes(prev => 
      prev.includes(value) ? prev.filter(t => t !== value) : [...prev, value]
    );
  };

  const toggleCategory = (value: string) => {
    setSelectedCategories(prev => 
      prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
    );
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (selectedPetTypes.length > 0) {
      params.set('petType', selectedPetTypes.join(','));
    } else {
      params.delete('petType');
    }

    if (selectedCategories.length > 0) {
      params.set('category', selectedCategories.join(','));
    } else {
      params.delete('category');
    }

    // Reset to page 1 on filter change
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
      <h2 className="font-semibold text-gray-900 mb-4 pb-4 border-b border-gray-100">{t('filters.title')}</h2>
      
      <div className="space-y-6">
        {/* Pet Type Filter */}
        {!hidePetType && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">{t('filters.petType')}</h3>
            <div className="space-y-2">
              {PET_TYPES.map(({ labelKey, value }) => (
                <label key={value} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-[18px] h-[18px]">
                    <input 
                      type="checkbox" 
                      className="peer appearance-none w-[18px] h-[18px] border border-gray-400 rounded-sm bg-white checked:bg-brand-600 checked:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1 transition-colors cursor-pointer" 
                      checked={selectedPetTypes.includes(value)}
                      onChange={() => togglePetType(value)}
                    />
                    <svg 
                      className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[15px] text-slate-700 group-hover:text-slate-900 transition-colors">{t(labelKey)}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">{t('filters.category')}</h3>
          <div className="space-y-3">
            {CATEGORIES.map(({ labelKey, value }) => (
              <label key={value} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-[18px] h-[18px]">
                  <input 
                    type="checkbox" 
                    className="peer appearance-none w-[18px] h-[18px] border border-gray-400 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors cursor-pointer" 
                    checked={selectedCategories.includes(value)}
                    onChange={() => toggleCategory(value)}
                  />
                  <svg 
                    className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[15px] text-slate-700 group-hover:text-slate-900 transition-colors">{t(labelKey)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleApplyFilters}
        className="w-full mt-6 py-2 bg-brand-50 text-brand-600 font-medium rounded-lg hover:bg-brand-100 transition-colors cursor-pointer"
      >
        {t('filters.apply')}
      </button>
    </div>
  );
}

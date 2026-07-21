"use client";

import { useState } from 'react';
import { ProductActionsProps } from '@/types/components';
import AddToCartButton from './AddToCartButton';
import FavoriteButton from './FavoriteButton';
import { useTranslation } from '@/hooks/useTranslation';

export default function ProductActions({ product }: ProductActionsProps) {
  const { t } = useTranslation();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const selectedVariant = product.variants?.[selectedVariantIndex];

  // Group variants by unique sizes and flavors
  const uniqueSizes = Array.from(new Set(product.variants?.map(v => v.size).filter(Boolean)));
  const uniqueFlavors = Array.from(new Set(product.variants?.map(v => v.flavor).filter(Boolean)));

  const handleSizeClick = (size: string) => {
    // Find the first variant that matches this size (and currently selected flavor if applicable)
    const currentFlavor = selectedVariant?.flavor;
    let nextVariantIndex = product.variants?.findIndex(v => v.size === size && v.flavor === currentFlavor);
    
    if (nextVariantIndex === -1 || nextVariantIndex === undefined) {
      // Fallback to first variant with this size
      nextVariantIndex = product.variants?.findIndex(v => v.size === size);
    }
    
    if (nextVariantIndex !== -1 && nextVariantIndex !== undefined) {
      setSelectedVariantIndex(nextVariantIndex);
    }
  };

  const handleFlavorClick = (flavor: string) => {
    // Find the first variant that matches this flavor (and currently selected size if applicable)
    const currentSize = selectedVariant?.size;
    let nextVariantIndex = product.variants?.findIndex(v => v.flavor === flavor && v.size === currentSize);
    
    if (nextVariantIndex === -1 || nextVariantIndex === undefined) {
      // Fallback to first variant with this flavor
      nextVariantIndex = product.variants?.findIndex(v => v.flavor === flavor);
    }
    
    if (nextVariantIndex !== -1 && nextVariantIndex !== undefined) {
      setSelectedVariantIndex(nextVariantIndex);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Price Display based on selected variant */}
      <div className="mb-6">
        <div className="text-3xl font-bold text-gray-900">
          ${selectedVariant?.price.toFixed(2) || '0.00'}
        </div>
        {selectedVariant?.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price && (
          <div className="text-sm text-gray-500 line-through">
            ${selectedVariant.compareAtPrice.toFixed(2)}
          </div>
        )}
        <div className={`text-sm mt-2 font-medium ${selectedVariant && selectedVariant.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {selectedVariant && selectedVariant.stock > 0 ? t('product.inStock') : t('product.outOfStock')}
        </div>
      </div>

      {/* Variants Selection */}
      <div className="mb-8 space-y-6">
        {uniqueSizes.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">{t('product.size')}</h3>
            <div className="flex flex-wrap gap-3">
              {uniqueSizes.map((size, i) => (
                <button
                  key={i}
                  onClick={() => size && handleSizeClick(size)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border cursor-pointer transition-colors ${
                    selectedVariant?.size === size
                      ? 'border-brand-600 bg-brand-50 text-brand-700'
                      : 'border-gray-200 text-gray-700 hover:border-brand-300'
                  }`}
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {uniqueFlavors.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">{t('product.flavor')}</h3>
            <div className="flex flex-wrap gap-3">
              {uniqueFlavors.map((flavor, i) => (
                <button
                  key={i}
                  onClick={() => flavor && handleFlavorClick(flavor)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border cursor-pointer transition-colors ${
                    selectedVariant?.flavor === flavor
                      ? 'border-brand-600 bg-brand-50 text-brand-700'
                      : 'border-gray-200 text-gray-700 hover:border-brand-300'
                  }`}
                  type="button"
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-auto space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <AddToCartButton product={product} selectedVariantIndex={selectedVariantIndex} />
          </div>
          <FavoriteButton product={product} />
        </div>
        <button className="w-full bg-gray-100 text-gray-800 font-bold py-3.5 rounded-full hover:bg-gray-200 transition-colors cursor-pointer" type="button">
          {t('product.subscribeAndSave')}
        </button>
      </div>
    </div>
  );
}

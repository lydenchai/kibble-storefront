"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

export default function ProductImageGallery({ images, name }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const displayImages = images && images.length > 0 ? images : ['/placeholder.jpg'];
  const activeImage = displayImages[activeIndex] || displayImages[0];

  return (
    <div className="space-y-4">
      {/* Main Active Image Box */}
      <div className="relative aspect-square rounded-3xl bg-white p-6 border border-gray-100 shadow-xs overflow-hidden group">
        <Image
          src={activeImage}
          alt={name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Lightbox Trigger Button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          type="button"
          aria-label="Enlarge image"
          className="absolute top-4 right-4 p-2.5 bg-white/80 hover:bg-white text-gray-700 hover:text-brand-600 rounded-full backdrop-blur-xs shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {/* Thumbnail Selector List */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {displayImages.map((img, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative w-20 h-20 rounded-2xl bg-white p-2 border-2 transition-all cursor-pointer shrink-0 overflow-hidden ${
                  isSelected
                    ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-md scale-105'
                    : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`${name} thumbnail ${idx + 1}`}
                  fill
                  className="object-contain p-1"
                  sizes="80px"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <button
            onClick={() => setIsLightboxOpen(false)}
            type="button"
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close image modal"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative w-full max-w-4xl max-h-[85vh] aspect-square">
            <Image
              src={activeImage}
              alt={name}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}

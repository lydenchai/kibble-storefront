"use client";

import { Star, StarHalf } from 'lucide-react';
import { ProductRatingProps } from '@/types/components';

export default function ProductRating({ rating, count }: ProductRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={18} className="fill-current" />
        ))}
        {hasHalfStar && <StarHalf size={18} className="fill-current text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={18} className="text-gray-300" />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-sm text-gray-500">
          ({count} review{count !== 1 && 's'})
        </span>
      )}
    </div>
  );
}

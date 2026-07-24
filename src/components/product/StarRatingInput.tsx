"use client";

import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingInputProps {
  rating: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
}

export default function StarRatingInput({ rating, onChange, disabled = false }: StarRatingInputProps) {
  const [hoverRating, setHoverRating] = useState<number>(0);

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Rate this product">
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const isFilled = starIndex <= (hoverRating || rating);
        return (
          <button
            key={starIndex}
            type="button"
            disabled={disabled}
            onClick={() => onChange(starIndex)}
            onMouseEnter={() => setHoverRating(starIndex)}
            onMouseLeave={() => setHoverRating(0)}
            className={`p-1 rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer ${
              disabled ? 'opacity-60 cursor-not-allowed' : 'hover:scale-110'
            }`}
            aria-label={`Rate ${starIndex} star${starIndex > 1 ? 's' : ''}`}
          >
            <Star
              size={24}
              className={`transition-colors ${
                isFilled
                  ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                  : 'text-gray-300 fill-transparent hover:text-amber-300'
              }`}
            />
          </button>
        );
      })}
      <span className="ml-2 text-sm font-semibold text-gray-700 min-w-[3.5rem]">
        {hoverRating || rating ? `${hoverRating || rating} / 5` : 'Select'}
      </span>
    </div>
  );
}

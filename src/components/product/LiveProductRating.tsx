"use client";

import { useState, useEffect } from 'react';
import ProductRating from './ProductRating';

interface LiveProductRatingProps {
  productId: string;
  initialRating: number;
  initialCount: number;
}

export default function LiveProductRating({ productId, initialRating, initialCount }: LiveProductRatingProps) {
  const [rating, setRating] = useState<number>(initialRating);
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    setRating(initialRating);
    setCount(initialCount);
  }, [initialRating, initialCount]);

  useEffect(() => {
    const handleReviewUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ productId: string; ratingAvg: number; ratingCount: number }>;
      if (customEvent.detail && customEvent.detail.productId === productId) {
        setRating(customEvent.detail.ratingAvg);
        setCount(customEvent.detail.ratingCount);
      }
    };

    window.addEventListener('reviewUpdated', handleReviewUpdate);
    return () => {
      window.removeEventListener('reviewUpdated', handleReviewUpdate);
    };
  }, [productId]);

  const scrollToReviews = () => {
    const element = document.getElementById('customer-reviews');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToReviews}
      type="button"
      className="inline-flex items-center gap-2 group cursor-pointer text-left focus:outline-none rounded-lg p-1 -ml-1 hover:bg-gray-50 transition-colors"
      title="Click to view reviews"
    >
      <ProductRating rating={rating} count={count} />
    </button>
  );
}

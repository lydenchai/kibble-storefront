"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { getFeaturedReviewsAction } from '@/actions/review.actions';

interface Testimonial {
  id: string | number;
  name: string;
  role: string;
  comment: string;
  rating: number;
  pet: string;
  avatarBg: string;
}

const avatarGradients = [
  "from-amber-400 to-orange-500",
  "from-sky-400 to-indigo-500",
  "from-purple-400 to-pink-500",
  "from-emerald-400 to-teal-600",
  "from-rose-400 to-red-500",
  "from-blue-400 to-cyan-500"
];

const defaultTestimonialsData: Testimonial[] = [
  {
    id: "seed-1",
    name: "Sarah Jenkins",
    role: "Golden Retriever Owner",
    comment: "Kibble's organic salmon formula completely transformed my dog's coat and energy levels! Delivery is always right on time.",
    rating: 5,
    pet: "Golden Retriever 🐕",
    avatarBg: "from-amber-400 to-orange-500"
  },
  {
    id: "seed-2",
    name: "Marcus Vance",
    role: "Cat Lover",
    comment: "My cats are extremely picky eaters, but they devoured the Kibble gourmet wet food instantly. Highly recommend subscription!",
    rating: 5,
    pet: "2 Siamese Cats 🐈",
    avatarBg: "from-sky-400 to-indigo-500"
  },
  {
    id: "seed-3",
    name: "Emily Watson",
    role: "French Bulldog Parent",
    comment: "Customer support is top notch! Helped me pick the hypoallergenic treats for my puppy. 10/10 quality and care.",
    rating: 5,
    pet: "Frenchie 🐶",
    avatarBg: "from-purple-400 to-pink-500"
  },
  {
    id: "seed-4",
    name: "David Chen",
    role: "Labrador Parent",
    comment: "The auto-ship feature saves me so much hassle every month. High protein nutrition that keeps Max active and healthy!",
    rating: 5,
    pet: "Labrador 🦮",
    avatarBg: "from-emerald-400 to-teal-600"
  },
  {
    id: "seed-5",
    name: "Jessica Taylor",
    role: "Rescue Cat Mom",
    comment: "Grain-free recipes that my sensitive stomach cats adore. Plus, fast 2-day delivery right to my doorstep!",
    rating: 5,
    pet: "3 Domestic Shorthairs 🐱",
    avatarBg: "from-rose-400 to-red-500"
  },
  {
    id: "seed-6",
    name: "Alex Rivera",
    role: "Pug & Parrot Owner",
    comment: "Fantastic range of health supplements and dental chews. Kibble is our number one pet supply store for 2 years running.",
    rating: 5,
    pet: "Pug & Parrot 🦜",
    avatarBg: "from-blue-400 to-cyan-500"
  }
];

export default function TestimonialCarousel() {
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonialsData);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    async function loadFeaturedReviews() {
      const res = await getFeaturedReviewsAction(6);
      if (res.success && res.data && res.data.length > 0) {
        const mapped: Testimonial[] = res.data.map((item, idx) => {
          let userName = "Verified Buyer";
          if (typeof item.user === 'object' && item.user !== null) {
            if (item.user.name) userName = item.user.name;
            else if (item.user.firstName || item.user.lastName) {
              userName = `${item.user.firstName || ''} ${item.user.lastName || ''}`.trim();
            }
          }

          let petBadge = "Verified Buyer 🐾";
          if (item.product && typeof item.product === 'object' && item.product.name) {
            petBadge = item.product.name;
          }

          return {
            id: item._id,
            name: userName,
            role: "Verified Customer",
            comment: item.comment,
            rating: item.rating,
            pet: petBadge,
            avatarBg: avatarGradients[idx % avatarGradients.length]
          };
        });
        setTestimonials(mapped);
      }
    }

    loadFeaturedReviews();
  }, []);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollability, 350);
    }
  };

  return (
    <div className="relative">
      {/* Header Controls Bar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs text-brand-600 font-bold uppercase tracking-wider">Loved By Thousands</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">What Pet Parents Say</h2>
        </div>

        {/* Previous & Next Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous testimonial"
            className={`p-3 rounded-full border transition-all duration-200 cursor-pointer ${
              canScrollLeft
                ? 'bg-white border-gray-200 text-gray-800 hover:bg-brand-50 hover:border-brand-300 shadow-xs hover:scale-105'
                : 'bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next testimonial"
            className={`p-3 rounded-full border transition-all duration-200 cursor-pointer ${
              canScrollRight
                ? 'bg-white border-gray-200 text-gray-800 hover:bg-brand-50 hover:border-brand-300 shadow-xs hover:scale-105'
                : 'bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Carousel Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollability}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 no-scrollbar scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="snap-start shrink-0 w-[85vw] sm:w-[350px] md:w-[380px] bg-white p-6 sm:p-7 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400">
                  {[...Array(item.rating)].map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-brand-200" />
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-6 italic line-clamp-4">
                &ldquo;{item.comment}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${item.avatarBg} text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0`}>
                  {item.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm truncate max-w-[120px]">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-100 shrink-0 max-w-[130px] truncate">
                {item.pet}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

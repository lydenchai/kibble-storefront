"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, CheckCircle2, MessageSquare, AlertCircle, Send, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/hooks/useTranslation';
import StarRatingInput from './StarRatingInput';
import ProductRating from './ProductRating';
import { getReviewerName, getReviewerInitials } from '@/utils/review';
import {
  getProductReviewsAction,
  createReviewAction,
  getUserReviewStatusAction
} from '@/actions/review.actions';
import { ReviewItem } from '@/types/review-item';
import { ReviewStats } from '@/types/review-stat';

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [stats, setStats] = useState<ReviewStats>({
    ratingAvg: 0,
    ratingCount: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Form State
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

    const [reviewsRes, userStatusRes] = await Promise.all([
      getProductReviewsAction(productId),
      isAuthenticated ? getUserReviewStatusAction(productId, token) : Promise.resolve(null)
    ]);

    if (reviewsRes.success && reviewsRes.data) {
      setReviews(reviewsRes.data.reviews);
      setStats(reviewsRes.data.stats);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('reviewUpdated', {
          detail: {
            productId,
            ratingAvg: reviewsRes.data.stats.ratingAvg,
            ratingCount: reviewsRes.data.stats.ratingCount
          }
        }));
      }
    }

    if (userStatusRes && userStatusRes.success && userStatusRes.data) {
      setHasReviewed(userStatusRes.data.hasReviewed);
      if (userStatusRes.data.review) {
        setRating(userStatusRes.data.review.rating);
        setComment(userStatusRes.data.review.comment);
      }
    }

    setLoading(false);
  }, [productId, isAuthenticated]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating || rating < 1 || rating > 5) {
      toast.error('Please select a rating between 1 and 5 stars.');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a comment for your review.');
      return;
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!token) {
      toast.error('You must be logged in to post a review.');
      return;
    }

    setSubmitting(true);
    const res = await createReviewAction(productId, rating, comment, token);
    setSubmitting(false);

    if (res.success) {
      toast.success(hasReviewed ? 'Your review has been updated!' : 'Thank you for your review!');
      setHasReviewed(true);
      setIsEditing(false);
      loadData();
      router.refresh();
    } else {
      toast.error(res.error || 'Failed to submit review.');
    }
  };

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="h-7 w-7 text-brand-600" />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {t('reviews.title') || 'Customer Reviews & Ratings'}
        </h2>
      </div>

      {/* Overview & Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 bg-gray-50/80 p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-xs">
        {/* Rating Score Card */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-gray-100 shadow-xs text-center">
          <div className="text-5xl font-extrabold text-gray-900 mb-2">
            {stats.ratingAvg.toFixed(1)}
          </div>
          <div className="mb-2">
            <ProductRating rating={stats.ratingAvg} />
          </div>
          <p className="text-sm font-medium text-gray-500">
            Based on {stats.ratingCount} review{stats.ratingCount !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Rating Bars Distribution */}
        <div className="md:col-span-8 flex flex-col justify-center space-y-2.5">
          {[5, 4, 3, 2, 1].map((starNum) => {
            const count = stats.distribution[starNum as keyof typeof stats.distribution] || 0;
            const percentage = stats.ratingCount > 0 ? (count / stats.ratingCount) * 100 : 0;
            return (
              <div key={starNum} className="flex items-center gap-3 text-xs sm:text-sm">
                <span className="w-12 text-gray-600 font-medium flex items-center gap-1">
                  {starNum} <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                </span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-brand-500 transition-all duration-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-12 text-right font-medium text-gray-500">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rate & Comment Submission Box */}
      <div className="mb-12 bg-white rounded-2xl p-6 sm:p-8 border border-brand-100 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            {hasReviewed && !isEditing ? 'Your Review' : 'Leave a Rating & Comment'}
          </h3>
          {hasReviewed && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 underline cursor-pointer"
            >
              Edit Your Review
            </button>
          )}
        </div>

        {!isAuthenticated ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-brand-50/60 rounded-xl border border-brand-100/70">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-brand-600 shrink-0" />
              <p className="text-sm text-gray-700">
                {t('reviews.loginPrompt') || 'Please log in to share your experience and rate this product.'}
              </p>
            </div>
            <Link
              href="/login"
              className="px-6 py-2.5 bg-brand-600 text-white font-semibold text-sm rounded-full hover:bg-brand-700 transition-colors shadow-xs shrink-0"
            >
              {t('auth.login') || 'Log In'}
            </Link>
          </div>
        ) : hasReviewed && !isEditing ? (
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 text-emerald-800 text-sm flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-900">Thank you for rating this product!</p>
              <div className="mt-1">
                <ProductRating rating={rating} />
              </div>
              <p className="mt-2 text-gray-700 italic">&ldquo;{comment}&rdquo;</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Overall Rating <span className="text-red-500">*</span>
              </label>
              <StarRatingInput rating={rating} onChange={setRating} disabled={submitting} />
            </div>

            <div>
              <label htmlFor="review-comment" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Comment / Review <span className="text-red-500">*</span>
              </label>
              <textarea
                id="review-comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like or dislike about this product? How did your pet enjoy it?"
                disabled={submitting}
                className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-gray-900 text-sm resize-y"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              {isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 bg-brand-600 text-white font-semibold text-sm rounded-full hover:bg-brand-700 transition-all duration-200 shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Submit Review</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Customer Reviews List */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Customer Comments ({reviews.length})
        </h3>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="p-6 bg-white rounded-xl border border-gray-100 animate-pulse flex gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 p-8">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 font-semibold text-base">No reviews yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Be the first customer to share your thoughts and rate this product!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div
                key={rev._id}
                className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs hover:border-gray-200 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-amber-500 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                      {getReviewerInitials(rev.user)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 text-sm">
                          {getReviewerName(rev.user)}
                        </span>
                        {rev.verifiedPurchase && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        <ProductRating rating={rev.rating} />
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    {new Date(rev.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed pl-13">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

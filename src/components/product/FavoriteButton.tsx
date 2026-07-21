"use client";

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import { useAuthStore } from '@/store/useAuthStore';
import { toggleWishlistAction } from '@/actions/account.actions';
import { FavoriteButtonProps } from '@/types/components';
import toast from 'react-hot-toast';

export default function FavoriteButton({ product }: FavoriteButtonProps) {
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const { isFavorite, addFavorite, removeFavorite, setFavorites } = useFavoriteStore();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setIsFav(isFavorite(product._id));
  }, [product._id, isFavorite]);

  const toggleFavorite = async () => {
    if (loading) return;
    const wasFav = isFav;
    
    // Optimistic UI update
    if (wasFav) {
      removeFavorite(product._id);
      setIsFav(false);
      toast.success("Removed from wishlist");
    } else {
      addFavorite(product);
      setIsFav(true);
      toast.success("Added to wishlist");
    }

    if (user) {
      setLoading(true);
      try {
        const token = localStorage.getItem('accessToken');
        const res = await toggleWishlistAction(product._id, token);
        if (res.error) throw new Error(res.error);
        // Sync local store with the actual backend returned wishlist
        if (res.data?.wishlist) {
          setFavorites(res.data.wishlist);
        }
      } catch (error) {
        console.error("Failed to sync wishlist", error);
        // Revert optimistic update on failure
        if (wasFav) {
          addFavorite(product);
          setIsFav(true);
        } else {
          removeFavorite(product._id);
          setIsFav(false);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  if (!hydrated) {
    return (
      <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 opacity-50 cursor-not-allowed">
        <Heart size={24} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleFavorite}
      className={`w-12 h-12 flex items-center justify-center rounded-full bg-white border shadow-sm transition-colors cursor-pointer ${
        isFav ? 'border-red-200 text-red-500 hover:bg-red-50' : 'border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600'
      }`}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      type="button"
    >
      <Heart size={24} className={isFav ? "fill-current" : ""} />
    </button>
  );
}

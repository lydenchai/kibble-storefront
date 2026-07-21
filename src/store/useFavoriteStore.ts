import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FavoriteState } from '@/types/store';

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (product) => {
        const currentFavorites = get().favorites;
        if (!currentFavorites.some((p) => p._id === product._id)) {
          set({ favorites: [...currentFavorites, product] });
        }
      },
      removeFavorite: (productId) => {
        set({
          favorites: get().favorites.filter((p) => p._id !== productId),
        });
      },
      isFavorite: (productId) => {
        return get().favorites.some((p) => p._id === productId);
      },
      setFavorites: (products) => {
        set({ favorites: products });
      },
    }),
    {
      name: 'kibble-favorites',
    }
  )
);

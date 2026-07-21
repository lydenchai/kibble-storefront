import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logoutAction } from '../actions/auth.actions';
import { AuthState } from '@/types/store';
import { useCartStore } from './useCartStore';
import { useFavoriteStore } from './useFavoriteStore';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user, token) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', token);
          // Set a non-HttpOnly cookie so middleware knows we are authenticated
          document.cookie = "is_authenticated=true; path=/;";
        }
        set({ user, isAuthenticated: true });
      },
      logout: async () => {
        await logoutAction();

        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          document.cookie = "is_authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        }
        
        // Clear user-specific stores
        useCartStore.getState().clearCart();
        useFavoriteStore.getState().setFavorites([]);

        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'kibble-auth-storage',
    }
  )
);

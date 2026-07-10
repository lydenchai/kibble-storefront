import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user, token) => {
        // Normally we'd store the token in cookies or localStorage for apiClient
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', token);
        }
        set({ user, isAuthenticated: true });
      },
      logout: async () => {
        try {
          // Send logout request to backend to clear the httpOnly refresh token cookie
          const { apiClient } = require('@/lib/apiClient');
          await apiClient.post('/auth/logout', {});
        } catch (error) {
          console.error('Failed to logout from backend', error);
        }

        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
        }
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'kibble-auth-storage',
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logoutAction } from '../actions/auth.actions';

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
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', token);
        }
        set({ user, isAuthenticated: true });
      },
      logout: async () => {
        await logoutAction();

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

import { create } from 'zustand';

interface LoadingState {
  activeRequests: number;
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  resetLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  activeRequests: 0,
  isLoading: false,
  startLoading: () =>
    set((state) => {
      const nextRequests = state.activeRequests + 1;
      return { activeRequests: nextRequests, isLoading: nextRequests > 0 };
    }),
  stopLoading: () =>
    set((state) => {
      const nextRequests = Math.max(0, state.activeRequests - 1);
      return { activeRequests: nextRequests, isLoading: nextRequests > 0 };
    }),
  resetLoading: () => set({ activeRequests: 0, isLoading: false }),
}));

import { create } from 'zustand';

type Translations = Record<string, any>;

interface TranslationState {
  language: string;
  translations: Translations;
  setLanguage: (lang: string) => Promise<void>;
  fetchTranslations: (lang: string) => Promise<void>;
}

export const useTranslationStore = create<TranslationState>((set, get) => ({
  language: 'en',
  translations: {},
  setLanguage: async (lang: string) => {
    // Save to local storage
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_language', lang);
    }
    await get().fetchTranslations(lang);
    set({ language: lang });
  },
  fetchTranslations: async (lang: string) => {
    try {
      const res = await fetch(`/i18n/${lang}.json`);
      if (res.ok) {
        const data = await res.json();
        set({ translations: data });
      } else {
        console.warn(`Failed to fetch translations for ${lang}`);
      }
    } catch (err) {
      console.warn(`Error fetching translations for ${lang}`, err);
    }
  },
}));

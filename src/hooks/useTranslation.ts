'use client';

import { useEffect, useState } from 'react';
import { useTranslationStore } from '@/store/useTranslationStore';

export function useTranslation() {
  const { translations, language, setLanguage, fetchTranslations } = useTranslationStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initLanguage = async () => {
      let savedLang = 'en';
      if (typeof window !== 'undefined') {
        savedLang = localStorage.getItem('app_language') || 'en';
      }
      if (language !== savedLang || Object.keys(translations).length === 0) {
        await fetchTranslations(savedLang);
        useTranslationStore.setState({ language: savedLang });
      }
      setMounted(true);
    };
    initLanguage();
  }, [fetchTranslations, language, translations]);

  const t = (keyString: string) => {
    if (!mounted) return '';
    const keys = keyString.split('.');
    let current: any = translations;

    for (const key of keys) {
      if (current[key] === undefined) {
        return keyString; // Fallback to key if not found
      }
      current = current[key];
    }
    return current;
  };

  return { t, language, setLanguage, mounted };
}

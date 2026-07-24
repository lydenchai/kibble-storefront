'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLoadingStore } from '@/store/useLoadingStore';

export default function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isLoading = useLoadingStore((state) => state.isLoading);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setProgress(35);
      const timer = setInterval(() => {
        setProgress((prev) => (prev >= 85 ? 85 : prev + 8));
      }, 150);
      return () => clearInterval(timer);
    } else {
      setProgress(100);
      const timer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    useLoadingStore.getState().resetLoading();
  }, [pathname, searchParams]);

  if (!visible && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      <div
        className="h-1 bg-gradient-to-r from-brand-500 via-brand-600 to-amber-500 transition-all duration-300 ease-out shadow-[0_0_12px_#ea580c]"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}

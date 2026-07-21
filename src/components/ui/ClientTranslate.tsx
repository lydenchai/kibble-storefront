"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useState } from "react";

export default function ClientTranslate({ translationKey }: { translationKey: string }) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="invisible">loading</span>;
  }

  return <>{t(translationKey)}</>;
}

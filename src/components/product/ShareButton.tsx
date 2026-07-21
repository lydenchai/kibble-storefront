"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import toast from 'react-hot-toast';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors cursor-pointer"
      title="Share product link"
      type="button"
    >
      {copied ? (
        <>
          <Check size={18} className="text-green-500" />
          <span className="text-green-600">Copied!</span>
        </>
      ) : (
        <>
          <Share2 size={18} />
          <span>Share</span>
        </>
      )}
    </button>
  );
}

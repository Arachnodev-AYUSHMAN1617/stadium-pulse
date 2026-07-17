import React, { useEffect, useState } from "react";

export default function AlertBanner({ isVisible, onClose, language = "en" }) {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  const langNames = {
    en: "EN • English",
    hi: "HI • हिन्दी",
    es: "ES • Español",
    ar: "AR • العربية",
    cg: "CG • छत्तीसगढ़ी"
  };

  return (
    <div
      className={`fixed top-24 left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-4 transition-all duration-500 ease-out transform ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "-translate-y-12 opacity-0 scale-95 pointer-events-none"
      }`}
      onTransitionEnd={() => {
        if (!isVisible) setShouldRender(false);
      }}
    >
      <div className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-gray-900/95 p-4 shadow-xl shadow-amber-500/5 backdrop-blur-md">
        {/* Decorative background glow */}
        <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-amber-500/10 blur-xl"></div>
        
        <div className="flex items-start gap-3">
          {/* Animated Spinner Icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-xl text-amber-400">
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">AI Agent Synthesizing</h3>
              <span className="rounded bg-gray-800 px-2 py-0.5 text-[10px] font-bold text-gray-400 border border-gray-700">
                {langNames[language] || language.toUpperCase()}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-300">
              AI is analyzing your report and cross-referencing zone crowd density to push safety alerts...
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            aria-label="Dismiss alert"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

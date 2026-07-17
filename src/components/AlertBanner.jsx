import React from "react";
import { Compass, Accessibility, Users, Leaf, Bus, ShieldAlert, X } from "lucide-react";

const categoryIcons = {
  navigation: Compass,
  accessibility: Accessibility,
  crowd: Users,
  sustainability: Leaf,
  transport: Bus,
  security: ShieldAlert
};

const severityStyles = {
  low: {
    border: "border-l-4 border-l-emerald-400 border-gray-800",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    text: "text-emerald-400"
  },
  medium: {
    border: "border-l-4 border-l-amber-400 border-gray-800",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    text: "text-amber-400"
  },
  high: {
    border: "border-l-4 border-l-red-500 border-gray-800",
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
    text: "text-red-400"
  }
};

export default function AlertBanner({ isVisible, isLoading, alertData, onClose }) {
  if (!isVisible) return null;

  // Render shimmer effect if loading
  if (isLoading) {
    return (
      <div className="absolute top-0 left-0 right-0 z-20 m-4 rounded-xl border border-gray-800 bg-gray-900/95 p-4 shadow-xl backdrop-blur-md animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-16 bg-gray-800 rounded"></div>
            <div className="h-5 w-24 bg-gray-800 rounded"></div>
          </div>
          <div className="h-5 w-5 bg-gray-800 rounded-full"></div>
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-4 w-full bg-gray-700 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
        </div>
        <div className="mt-4 h-3 w-32 bg-gray-800 rounded"></div>
      </div>
    );
  }

  if (!alertData) return null;

  const { severity = "low", fanAlert = "", category = "navigation", estimatedResolutionMins = 10 } = alertData;
  const styles = severityStyles[severity.toLowerCase()] || severityStyles.low;
  const CategoryIcon = categoryIcons[category.toLowerCase()] || Compass;

  return (
    <div className="absolute top-0 left-0 right-0 z-20 m-4 transition-all duration-300 transform translate-y-0 opacity-100">
      <div className={`relative overflow-hidden rounded-xl bg-gray-900/95 p-4 shadow-xl backdrop-blur-md border ${styles.border}`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col gap-2.5">
          {/* Header Row */}
          <div className="flex items-center gap-2">
            {/* Severity badge */}
            <span className={`rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${styles.badge}`}>
              {severity}
            </span>
            {/* Category badge */}
            <span className="flex items-center gap-1 rounded-md border border-gray-800 bg-gray-950 px-2 py-0.5 text-[10px] font-bold text-gray-300 uppercase">
              <CategoryIcon className="h-3 w-3 text-emerald-400" />
              {category}
            </span>
          </div>

          {/* Fan Alert Message */}
          <p className="pr-8 text-sm font-bold text-white leading-relaxed">
            {fanAlert}
          </p>

          {/* Estimated Resolution Time */}
          <div className="mt-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            Estimated Resolution: <span className="text-gray-400 font-bold">{estimatedResolutionMins} mins</span>
          </div>
        </div>
      </div>
    </div>
  );
}

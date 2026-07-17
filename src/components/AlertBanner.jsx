import React from "react";
import { Compass, Accessibility, Users, Leaf, Bus, ShieldAlert, X } from "lucide-react";

const GOLD = "#C9A84C";

const categoryIcons = {
  navigation: Compass,
  accessibility: Accessibility,
  crowd: Users,
  sustainability: Leaf,
  transport: Bus,
  security: ShieldAlert
};

const severityConfig = {
  low: {
    borderColor: "#22C55E",
    badgeBg: "rgba(34,197,94,0.12)",
    badgeBorder: "rgba(34,197,94,0.25)",
    badgeText: "#22C55E"
  },
  medium: {
    borderColor: "#F59E0B",
    badgeBg: "rgba(245,158,11,0.12)",
    badgeBorder: "rgba(245,158,11,0.25)",
    badgeText: "#F59E0B"
  },
  high: {
    borderColor: "#FF4444",
    badgeBg: "rgba(255,68,68,0.12)",
    badgeBorder: "rgba(255,68,68,0.25)",
    badgeText: "#FF4444"
  }
};

export default function AlertBanner({ isVisible, isLoading, alertData, onClose }) {
  if (!isVisible) return null;

  // Loading shimmer state
  if (isLoading) {
    return (
      <div
        className="absolute top-0 left-0 right-0 z-20 m-4 rounded-2xl p-4 shadow-2xl"
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderLeft: "4px solid rgba(201,168,76,0.5)"
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2">
            <div className="h-5 w-16 rounded shimmer" />
            <div className="h-5 w-24 rounded shimmer" />
          </div>
          <div className="h-5 w-5 rounded-full shimmer" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full rounded shimmer" />
          <div className="h-4 w-4/5 rounded shimmer" />
        </div>
        <div className="mt-3 h-3 w-36 rounded shimmer" />
      </div>
    );
  }

  if (!alertData) return null;

  const {
    severity = "low",
    fanAlert = "",
    category = "navigation",
    estimatedResolutionMins = 10
  } = alertData;

  const cfg = severityConfig[severity.toLowerCase()] || severityConfig.low;
  const CategoryIcon = categoryIcons[category.toLowerCase()] || Compass;

  return (
    <div
      className="absolute top-0 left-0 right-0 z-20 m-4 rounded-2xl p-4 shadow-2xl transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderLeft: `4px solid ${cfg.borderColor}`
      }}
    >
      {/* Dismiss */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-lg transition-colors cursor-pointer"
        style={{ color: "rgba(255,255,255,0.4)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
        }
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      {/* Top row */}
      <div className="flex items-center gap-2 pr-8">
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
          style={{
            backgroundColor: cfg.badgeBg,
            border: `1px solid ${cfg.badgeBorder}`,
            color: cfg.badgeText
          }}
        >
          {severity}
        </span>
        <span
          className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.5)"
          }}
        >
          <CategoryIcon className="h-3 w-3" style={{ color: GOLD }} />
          {category}
        </span>
      </div>

      {/* Fan alert message */}
      <p className="mt-2 text-sm font-semibold text-white leading-relaxed pr-6">
        {fanAlert}
      </p>

      {/* Resolution hint */}
      <p
        className="mt-2 text-xs"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        Est. resolution: {estimatedResolutionMins} mins •{" "}
        Routed to nearest staff
      </p>
    </div>
  );
}

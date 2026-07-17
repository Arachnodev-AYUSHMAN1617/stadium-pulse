import React from "react";
import stadiumZones from "../data/stadiumZones";

export default function StadiumMap({ reports, selectedZone, onSelectZone }) {
  // Helper to count active (or total) reports in each zone
  const getZoneReportCount = (zoneId) => {
    return reports.filter((r) => r.zone === zoneId).length;
  };

  // Helper to get zone status styling
  const getZoneStyles = (count, isSelected) => {
    let colorClasses = {
      fill: "rgba(16, 185, 129, 0.15)", // Green low
      stroke: "#10b981",
      glow: "rgba(16, 185, 129, 0.3)",
      textBadge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    };

    if (count >= 8) {
      // Red high
      colorClasses = {
        fill: "rgba(239, 68, 68, 0.25)",
        stroke: "#ef4444",
        glow: "rgba(239, 68, 68, 0.5)",
        textBadge: "bg-red-500/20 text-red-400 border-red-500/30"
      };
    } else if (count >= 4) {
      // Yellow medium
      colorClasses = {
        fill: "rgba(245, 158, 11, 0.25)",
        stroke: "#f59e0b",
        glow: "rgba(245, 158, 11, 0.4)",
        textBadge: "bg-amber-500/20 text-amber-400 border-amber-500/30"
      };
    }

    return colorClasses;
  };

  return (
    <div className="flex flex-col items-center w-full rounded-2xl border border-gray-800 bg-gray-900/40 p-4 backdrop-blur-sm">
      {/* Map Header */}
      <div className="mb-4 flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
            🏟️ Stadium Heatmap
          </h2>
          <p className="text-xs text-gray-500">
            Click a zone to isolate reports. Counts update in real time.
          </p>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-[10px] font-semibold text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            <span>Low (0-3)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
            <span>Medium (4-7)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
            <span>High (8+)</span>
          </div>
        </div>
      </div>

      {/* SVG Container */}
      <div className="relative w-full max-w-[500px] aspect-[500/330] rounded-xl overflow-hidden bg-gray-950/60 border border-gray-800/80 p-2">
        <svg
          viewBox="0 0 500 330"
          className="h-full w-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Grid background effect */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(31, 41, 55, 0.4)" strokeWidth="1" />
            </pattern>
            <radialGradient id="field-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#047857" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#065f46" stopOpacity="0.0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Outer Parking Lot fence representation */}
          <line x1="80" y1="20" x2="80" y2="310" stroke="rgba(75, 85, 99, 0.3)" strokeWidth="2" strokeDasharray="4 4" />

          {/* Stadium Shell (Outer Oval) */}
          <ellipse
            cx="255"
            cy="165"
            rx="155"
            ry="115"
            fill="#111827"
            stroke="#374151"
            strokeWidth="3"
            className="transition-all duration-300"
          />

          {/* Stadium Inner Ring */}
          <ellipse
            cx="255"
            cy="165"
            rx="120"
            ry="85"
            fill="#0b0f19"
            stroke="#1f2937"
            strokeWidth="2"
          />

          {/* Soccer Field (Center Pitch) */}
          <rect
            x="195"
            y="125"
            width="120"
            height="80"
            fill="#065f46"
            fillOpacity="0.45"
            stroke="#059669"
            strokeWidth="1.5"
            rx="4"
          />
          {/* Field Markings */}
          <circle cx="255" cy="165" r="20" fill="none" stroke="#059669" strokeWidth="1.5" opacity="0.6" />
          <line x1="255" y1="125" x2="255" y2="205" stroke="#059669" strokeWidth="1.5" opacity="0.6" />
          <rect x="195" y="145" width="15" height="40" fill="none" stroke="#059669" strokeWidth="1.5" opacity="0.6" />
          <rect x="300" y="145" width="15" height="40" fill="none" stroke="#059669" strokeWidth="1.5" opacity="0.6" />

          {/* Dynamic Ellipses for Zones */}
          {stadiumZones.map((zone) => {
            const count = getZoneReportCount(zone.id);
            const isSelected = selectedZone === zone.id;
            const styles = getZoneStyles(count, isSelected);

            return (
              <g
                key={zone.id}
                onClick={() => onSelectZone(isSelected ? null : zone.id)}
                className="cursor-pointer group"
              >
                {/* Glow ring if selected */}
                {isSelected && (
                  <ellipse
                    cx={zone.cx}
                    cy={zone.cy}
                    rx={zone.rx + 8}
                    ry={zone.ry + 8}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                    className="animate-[spin_10s_linear_infinite]"
                  />
                )}

                {/* Base Zone Shape */}
                <ellipse
                  cx={zone.cx}
                  cy={zone.cy}
                  rx={zone.rx}
                  ry={zone.ry}
                  fill={styles.fill}
                  stroke={isSelected ? "#38bdf8" : styles.stroke}
                  strokeWidth={isSelected ? 3 : 2}
                  className="transition-all duration-300 group-hover:scale-105 origin-center"
                  style={{
                    filter: `drop-shadow(0 0 4px ${isSelected ? "rgba(56, 189, 248, 0.4)" : styles.glow})`
                  }}
                />

                {/* Text Labels inside Ellipses */}
                <text
                  x={zone.cx}
                  y={zone.cy - 4}
                  fill="#ffffff"
                  fontSize="8.5"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                >
                  {zone.id === "food-court"
                    ? "Food Court"
                    : zone.id === "parking"
                    ? "Parking"
                    : zone.name.split(" (")[0]}
                </text>

                <text
                  x={zone.cx}
                  y={zone.cy + 7}
                  fill={isSelected ? "#38bdf8" : "#9ca3af"}
                  fontSize="8"
                  fontWeight="semibold"
                  textAnchor="middle"
                  className="pointer-events-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]"
                >
                  {count} {count === 1 ? "report" : "reports"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected zone filter reset badge */}
      {selectedZone && (
        <button
          onClick={() => onSelectZone(null)}
          className="mt-3 flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20 hover:bg-sky-500/20 transition-all"
        >
          <span>Filtering: {stadiumZones.find((z) => z.id === selectedZone)?.name}</span>
          <span className="font-bold text-sky-300">✕</span>
        </button>
      )}
    </div>
  );
}

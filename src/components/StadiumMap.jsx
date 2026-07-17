import React from "react";
import stadiumZones from "../data/stadiumZones";

export default function StadiumMap({ reports, selectedZone, onSelectZone }) {
  // Helper to count active reports in each zone
  const getZoneReportCount = (zoneId) => {
    return reports.filter((r) => r.zone === zoneId).length;
  };

  // Helper to get zone status styling
  const getZoneStyles = (count) => {
    let styles = {
      fill: "rgba(16, 185, 129, 0.7)", // Green (0-3)
      stroke: "#10b981",
      isHigh: false
    };

    if (count >= 8) {
      styles = {
        fill: "rgba(239, 68, 68, 0.7)", // Red (8+)
        stroke: "#ef4444",
        isHigh: true
      };
    } else if (count >= 4) {
      styles = {
        fill: "rgba(245, 158, 11, 0.7)", // Yellow (4-7)
        stroke: "#f59e0b",
        isHigh: false
      };
    }

    return styles;
  };

  return (
    <div className="flex flex-col items-center w-full rounded-2xl border border-gray-800 bg-gray-900 p-5">
      {/* Map Header */}
      <div className="mb-4 flex w-full flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <span className="text-gray-400 text-xs uppercase tracking-widest font-semibold block mb-0.5">
            Live Stadium Intelligence
          </span>
          <h2 className="text-lg font-bold text-white">Heatmap Status</h2>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-xs font-medium text-gray-400">
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
      <div className="relative w-full max-w-[500px] aspect-[500/330] rounded-xl overflow-hidden bg-gray-950 border border-gray-800 p-2">
        <svg
          viewBox="0 0 500 330"
          className="h-full w-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(31, 41, 55, 0.4)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Outer Parking Lot fence line */}
          <line x1="80" y1="20" x2="80" y2="310" stroke="rgba(75, 85, 99, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Stadium Outer Ring (stroke-gray-600, fill-gray-900) */}
          <ellipse
            cx="255"
            cy="165"
            rx="155"
            ry="115"
            className="stroke-gray-600 fill-gray-900"
            strokeWidth="3.5"
          />

          {/* Stadium Inner Ring */}
          <ellipse
            cx="255"
            cy="165"
            rx="120"
            ry="85"
            fill="#030712"
            stroke="#1f2937"
            strokeWidth="2"
          />

          {/* Soccer Field (Center Pitch: fill-emerald-950) */}
          <rect
            x="195"
            y="125"
            width="120"
            height="80"
            className="fill-emerald-950 stroke-emerald-500/20"
            strokeWidth="1.5"
            rx="4"
          />
          {/* Field Markings - White */}
          <circle cx="255" cy="165" r="18" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
          <line x1="255" y1="125" x2="255" y2="205" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
          <rect x="195" y="143" width="15" height="44" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
          <rect x="300" y="143" width="15" height="44" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.3" />

          {/* Zones */}
          {stadiumZones.map((zone) => {
            const count = getZoneReportCount(zone.id);
            const isSelected = selectedZone === zone.id;
            const styles = getZoneStyles(count);

            // Determine badge position relative to ellipse center
            const badgeX = zone.cx + (zone.rx * 0.65);
            const badgeY = zone.cy - (zone.ry * 0.65);

            return (
              <g
                key={zone.id}
                onClick={() => onSelectZone(isSelected ? null : zone.id)}
                className="cursor-pointer"
              >
                {/* Glow ring if selected */}
                {isSelected && (
                  <ellipse
                    cx={zone.cx}
                    cy={zone.cy}
                    rx={zone.rx + 6}
                    ry={zone.ry + 6}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                )}

                {/* Ellipse shape */}
                <ellipse
                  cx={zone.cx}
                  cy={zone.cy}
                  rx={zone.rx}
                  ry={zone.ry}
                  fill={styles.fill}
                  stroke={isSelected ? "#38bdf8" : styles.stroke}
                  strokeWidth={isSelected ? 3 : 2}
                  className={`transition-all duration-300 ${styles.isHigh ? "pulse-zone" : ""}`}
                />

                {/* Zone Label */}
                <text
                  x={zone.cx}
                  y={zone.cy}
                  fill="#ffffff"
                  fontSize="11px"
                  fontWeight="500"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="pointer-events-none select-none font-sans"
                >
                  {zone.id === "food-court"
                    ? "Food Court"
                    : zone.id === "parking"
                    ? "Parking"
                    : zone.name.split(" (")[0]}
                </text>

                {/* Report Count Circle Badge */}
                {count > 0 && (
                  <g className="pointer-events-none select-none">
                    <circle
                      cx={badgeX}
                      cy={badgeY}
                      r="8.5"
                      fill="#030712"
                      stroke={isSelected ? "#38bdf8" : styles.stroke}
                      strokeWidth="1.5"
                    />
                    <text
                      x={badgeX}
                      y={badgeY}
                      fill="#ffffff"
                      fontSize="9px"
                      fontWeight="700"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="font-sans"
                    >
                      {count}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected zone filter reset badge */}
      {selectedZone && (
        <button
          onClick={() => onSelectZone(null)}
          className="mt-3 flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20 hover:bg-sky-500/20 transition-all cursor-pointer"
        >
          <span>Filtering: {stadiumZones.find((z) => z.id === selectedZone)?.name}</span>
          <span className="font-bold text-sky-300">✕</span>
        </button>
      )}
    </div>
  );
}

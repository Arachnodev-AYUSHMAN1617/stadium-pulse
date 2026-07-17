import React from "react";
import stadiumZones from "../data/stadiumZones";

export default function StadiumMap({ reports, selectedZone, onSelectZone }) {
  // Count active reports per zone — logic unchanged
  const getZoneReportCount = (zoneId) =>
    reports.filter((r) => r.zone === zoneId).length;

  // Zone styling based on report count — logic unchanged, colors upgraded
  const getZoneStyles = (count) => {
    if (count >= 8) {
      return {
        fill: "rgba(255,68,68,0.25)",
        stroke: "rgba(255,68,68,0.7)",
        isHigh: true
      };
    } else if (count >= 4) {
      return {
        fill: "rgba(245,158,11,0.25)",
        stroke: "rgba(245,158,11,0.6)",
        isHigh: false
      };
    }
    return {
      fill: "rgba(34,197,94,0.25)",
      stroke: "rgba(34,197,94,0.6)",
      isHigh: false
    };
  };

  return (
    <div className="glass-card p-4 flex flex-col items-center w-full">
      {/* Map title */}
      <p
        className="text-center mb-2 tracking-[0.25em]"
        style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px" }}
      >
        LIVE STADIUM INTELLIGENCE
      </p>

      {/* SVG */}
      <div className="relative w-full aspect-[600/400] rounded-xl overflow-hidden">
        <svg
          viewBox="0 0 600 400"
          className="h-full w-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background */}
          <rect width="600" height="400" fill="rgba(5,10,26,0.95)" />

          {/* Subtle grid */}
          <defs>
            <pattern id="spgrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="600" height="400" fill="url(#spgrid)" />

          {/* Outer stadium ring */}
          <ellipse
            cx="300"
            cy="200"
            rx="240"
            ry="170"
            fill="rgba(201,168,76,0.05)"
            stroke="rgba(201,168,76,0.3)"
            strokeWidth="2"
          />

          {/* Stadium seating ring */}
          <ellipse
            cx="300"
            cy="200"
            rx="195"
            ry="130"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1.5"
          />

          {/* Pitch — dark turf */}
          <rect
            x="180"
            y="130"
            width="240"
            height="140"
            fill="#0D2B14"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
            rx="6"
          />

          {/* Pitch markings */}
          {/* Halfway line */}
          <line
            x1="300"
            y1="130"
            x2="300"
            y2="270"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
          {/* Centre circle */}
          <circle
            cx="300"
            cy="200"
            r="30"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
          {/* Centre spot */}
          <circle cx="300" cy="200" r="2" fill="rgba(255,255,255,0.25)" />
          {/* Left penalty box */}
          <rect
            x="180"
            y="162"
            width="40"
            height="76"
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1"
          />
          {/* Left 6-yard box */}
          <rect
            x="180"
            y="179"
            width="15"
            height="42"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
          {/* Right penalty box */}
          <rect
            x="380"
            y="162"
            width="40"
            height="76"
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1"
          />
          {/* Right 6-yard box */}
          <rect
            x="405"
            y="179"
            width="15"
            height="42"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
          {/* Corner arcs — top-left */}
          <path
            d="M 180 138 Q 188 130 196 138"
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1"
          />
          {/* Corner arcs — top-right */}
          <path
            d="M 404 138 Q 412 130 420 138"
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1"
          />
          {/* Corner arcs — bottom-left */}
          <path
            d="M 180 262 Q 188 270 196 262"
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1"
          />
          {/* Corner arcs — bottom-right */}
          <path
            d="M 404 262 Q 412 270 420 262"
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1"
          />

          {/* Zone Ellipses */}
          {stadiumZones.map((zone) => {
            const count = getZoneReportCount(zone.id);
            const isSelected = selectedZone === zone.id;
            const styles = getZoneStyles(count);

            // Scale zone coords from 500x330 → 600x400
            const scaleX = 600 / 500;
            const scaleY = 400 / 330;
            const cx = zone.cx * scaleX;
            const cy = zone.cy * scaleY;
            const rx = zone.rx * scaleX;
            const ry = zone.ry * scaleY;

            const badgeX = cx + rx * 0.6;
            const badgeY = cy - ry * 0.6;

            return (
              <g
                key={zone.id}
                onClick={() => onSelectZone(isSelected ? null : zone.id)}
                className="cursor-pointer"
              >
                {/* Gold selection ring */}
                {isSelected && (
                  <ellipse
                    cx={cx}
                    cy={cy}
                    rx={rx + 7}
                    ry={ry + 7}
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="2.5"
                    strokeDasharray="5 3"
                    opacity="0.8"
                  />
                )}

                {/* Zone ellipse */}
                <ellipse
                  cx={cx}
                  cy={cy}
                  rx={rx}
                  ry={ry}
                  fill={styles.fill}
                  stroke={isSelected ? "#C9A84C" : styles.stroke}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  className={`transition-all duration-300 ${styles.isHigh ? "zone-critical" : ""}`}
                />

                {/* Zone label */}
                <text
                  x={cx}
                  y={cy}
                  fill="white"
                  fontSize="11"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="pointer-events-none select-none"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {zone.id === "food-court"
                    ? "Food Court"
                    : zone.id === "parking"
                    ? "Parking"
                    : zone.name.split(" (")[0]}
                </text>

                {/* Report count badge */}
                {count > 0 && (
                  <g className="pointer-events-none select-none">
                    <circle
                      cx={badgeX}
                      cy={badgeY}
                      r="9"
                      fill="#C9A84C"
                    />
                    <text
                      x={badgeX}
                      y={badgeY}
                      fill="#050A1A"
                      fontSize="9"
                      fontWeight="700"
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{ fontFamily: "Inter, sans-serif" }}
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

      {/* Legend bar */}
      <div
        className="flex items-center justify-center gap-5 mt-3"
        style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-400 inline-block" />
          Low
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-400 inline-block" />
          Medium
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500 inline-block" />
          High
        </div>
      </div>

      {/* Zone filter clear pill */}
      {selectedZone && (
        <button
          onClick={() => onSelectZone(null)}
          className="mt-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer"
          style={{
            backgroundColor: "rgba(201,168,76,0.10)",
            border: "1px solid rgba(201,168,76,0.25)",
            color: "#C9A84C"
          }}
        >
          <span>
            Filtering: {stadiumZones.find((z) => z.id === selectedZone)?.name}
          </span>
          <span className="font-bold">✕</span>
        </button>
      )}
    </div>
  );
}

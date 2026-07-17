import React from "react";
import { Leaf } from "lucide-react";
import stadiumZones from "../data/stadiumZones";

const GOLD = "#C9A84C";

export default function SustainabilityWidget({ reports }) {
  const getZoneSustainabilityScore = (zoneId) => {
    const reportCount = reports.filter((r) => r.zone === zoneId).length;
    return Math.max(0, 100 - reportCount * 10);
  };

  const getBarColor = (score) => {
    if (score > 70) return "#22C55E";
    if (score >= 40) return "#F59E0B";
    return "#FF4444";
  };

  const getScoreColor = (score) => {
    if (score > 70) return "#22C55E";
    if (score >= 40) return "#F59E0B";
    return "#FF4444";
  };

  return (
    <div className="glass-card p-4 mt-4">
      <div className="flex items-center gap-2 mb-4">
        <Leaf className="h-4 w-4" style={{ color: GOLD }} />
        <h3
          className="tracking-widest font-semibold"
          style={{ fontSize: "10px", color: "rgba(255,255,255,0.30)" }}
        >
          ZONE SUSTAINABILITY
        </h3>
      </div>

      <div className="space-y-3">
        {stadiumZones.map((zone) => {
          const score = getZoneSustainabilityScore(zone.id);
          const barColor = getBarColor(score);
          const scoreColor = getScoreColor(score);
          const zoneLabel =
            zone.id === "food-court"
              ? "Food Court"
              : zone.id === "parking"
              ? "Parking"
              : zone.name.split(" (")[0];

          return (
            <div key={zone.id} className="mb-3">
              <div className="flex items-center justify-between">
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.60)" }}
                >
                  {zoneLabel}
                </span>
                <span
                  className="text-xs font-mono font-semibold"
                  style={{ color: scoreColor }}
                >
                  {score}
                </span>
              </div>
              <div
                className="rounded-full h-1.5 mt-1 overflow-hidden"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <div
                  className="rounded-full h-1.5 transition-all duration-500"
                  style={{
                    width: `${score}%`,
                    backgroundColor: barColor
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

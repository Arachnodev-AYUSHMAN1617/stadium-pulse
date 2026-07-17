import React from "react";
import { Leaf } from "lucide-react";
import stadiumZones from "../data/stadiumZones";

export default function SustainabilityWidget({ reports }) {
  // Calculate score for each zone
  const getZoneSustainabilityScore = (zoneId) => {
    const reportCount = reports.filter((r) => r.zone === zoneId).length;
    // Base 100, subtract 10 per active report, clamped between 0 and 100
    const score = Math.max(0, 100 - reportCount * 10);
    return score;
  };

  const getBarColor = (score) => {
    if (score > 70) return "bg-emerald-400";
    if (score >= 40) return "bg-amber-400";
    return "bg-red-500";
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Leaf className="h-4.5 w-4.5 text-emerald-400" />
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Zone Sustainability Scores
        </h3>
      </div>

      <div className="space-y-3.5">
        {stadiumZones.map((zone) => {
          const score = getZoneSustainabilityScore(zone.id);
          const barColor = getBarColor(score);

          return (
            <div key={zone.id} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-gray-300">
                  {zone.id === "food-court"
                    ? "Food Court"
                    : zone.id === "parking"
                    ? "Parking"
                    : zone.name.split(" (")[0]}
                </span>
                <span className="font-bold text-gray-400">{score}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React from "react";

export default function LiveActivityTicker() {
  const items = [
    "🔴 Gate C — High Congestion",
    "✅ Gate B — Clear",
    "⚡ 47 Fans Reporting Live",
    "🌿 Sustainability Score: 72%",
    "🌐 5 Languages Active",
    "🏟️ FIFA WC 2026 — Match Day Operations"
  ];

  const tickerContent = items.join("   •   ");

  return (
    <div
      className="overflow-hidden flex items-center"
      style={{
        height: "28px",
        backgroundColor: "rgba(201,168,76,0.08)",
        borderBottom: "1px solid rgba(201,168,76,0.10)"
      }}
    >
      <div
        style={{
          display: "inline-block",
          animation: "ticker 50s linear infinite",
          whiteSpace: "nowrap",
          color: "rgba(201,168,76,0.70)",
          fontSize: "11px",
          letterSpacing: "0.05em"
        }}
      >
        {tickerContent}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tickerContent}
      </div>
    </div>
  );
}

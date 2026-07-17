import React from "react";
import { AlertCircle, CheckCircle, Zap, Leaf, Globe, Trophy } from "lucide-react";

const GOLD = "#C9A84C";

export default function LiveActivityTicker() {
  const items = [
    { Icon: AlertCircle, color: "#FF4444", text: "Gate C — High Congestion" },
    { Icon: CheckCircle, color: "#22C55E", text: "Gate B — Clear" },
    { Icon: Zap, color: GOLD, text: "47 Fans Reporting Live" },
    { Icon: Leaf, color: "#22C55E", text: "Sustainability Score: 72%" },
    { Icon: Globe, color: GOLD, text: "5 Languages Active" },
    { Icon: Trophy, color: GOLD, text: "FIFA WC 2026 — Match Day Operations" }
  ];

  const Dot = () => (
    <span
      style={{
        display: "inline-block",
        width: "3px",
        height: "3px",
        borderRadius: "50%",
        backgroundColor: "rgba(201,168,76,0.40)",
        margin: "0 14px",
        verticalAlign: "middle"
      }}
    />
  );

  const renderItem = (item, i) => (
    <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <item.Icon style={{ color: item.color, width: "12px", height: "12px", flexShrink: 0 }} />
      <span>{item.text}</span>
      {i < items.length - 1 && <Dot />}
    </span>
  );

  const content = (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {items.map(renderItem)}
      <Dot />
      {items.map((it, i) => renderItem(it, i + 100))}
    </span>
  );

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
        {content}&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  );
}

import React from "react";
import { Radar, Brain, LayoutDashboard } from "lucide-react";

export default function ViewSwitcher({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "fan", label: "Fan View", Icon: Radar },
    { id: "ai", label: "AI Monitor", Icon: Brain },
    { id: "staff", label: "Staff Dashboard", Icon: LayoutDashboard }
  ];

  return (
    <nav
      className="w-full overflow-x-auto"
      style={{
        backgroundColor: "rgba(255,255,255,0.02)",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}
    >
      <div className="flex min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const TabIcon = tab.Icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 py-3 px-6 text-sm font-medium transition-colors focus:outline-none whitespace-nowrap min-h-[44px]"
              style={{
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.4)",
                borderBottom: isActive
                  ? "2px solid #C9A84C"
                  : "2px solid transparent",
                backgroundColor: "transparent"
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <TabIcon
                className="h-4 w-4"
                style={{ color: isActive ? "#C9A84C" : "rgba(255,255,255,0.4)" }}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

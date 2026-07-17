import React from "react";
import { Radar, Brain, LayoutDashboard } from "lucide-react";

export default function ViewSwitcher({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "fan", label: "Fan View", Icon: Radar },
    { id: "ai", label: "AI Monitor", Icon: Brain },
    { id: "staff", label: "Staff Dashboard", Icon: LayoutDashboard }
  ];

  return (
    <nav className="w-full bg-gray-900 border-b border-gray-800 overflow-x-auto scrollbar-none">
      <div className="mx-auto flex max-w-7xl px-4">
        <div className="flex gap-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const TabIcon = tab.Icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 text-sm font-medium transition-all duration-200 border-b-2 focus:outline-none whitespace-nowrap min-h-[44px] ${
                  isActive
                    ? "border-emerald-400 text-white"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <TabIcon className={`h-4 w-4 ${isActive ? "text-emerald-400" : "text-gray-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

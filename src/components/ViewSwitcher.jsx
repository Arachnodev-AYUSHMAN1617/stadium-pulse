import React from "react";

export default function ViewSwitcher({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "fan", label: "Fan View", icon: "📣" },
    { id: "ai", label: "AI Layer", icon: "🧠" },
    { id: "staff", label: "Staff Dashboard", icon: "🛡️" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/20">
            <span className="text-xl font-bold text-gray-950">🏆</span>
            {/* Pulsing indicator */}
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-red-500"></span>
            </span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white sm:text-2xl">
              STADIUM<span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">PULSE</span>
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-500">
              FIFA World Cup 2026 • AI Intelligence
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 rounded-xl bg-gray-900/60 p-1.5 border border-gray-800">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-300 sm:px-4 sm:py-2 sm:text-sm ${
                  isActive
                    ? "bg-emerald-500 text-gray-950 shadow-md shadow-emerald-500/10 font-bold"
                    : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

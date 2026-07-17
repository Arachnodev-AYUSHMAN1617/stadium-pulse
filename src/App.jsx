import React, { useState, useEffect } from "react";
import { Radio, AlertTriangle, Trophy } from "lucide-react";
import ViewSwitcher from "./components/ViewSwitcher";
import FanView from "./components/FanView";
import AILayerView from "./components/AILayerView";
import StaffDashboard from "./components/StaffDashboard";
import seedReports from "./data/seedReports";

export default function App() {
  const [activeTab, setActiveTab] = useState("fan");
  const [reports, setReports] = useState(seedReports);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedZoneFilter, setSelectedZoneFilter] = useState(null);
  const [geminiLogs, setGeminiLogs] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Clock trigger updating every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Check if API Key is configured
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const isApiKeyConfigured = apiKey && apiKey !== "your_key_here";

  // Add new report
  const addReport = (newReportData) => {
    const newReport = {
      id: `rep-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: "pending",
      ...newReportData
    };
    
    // Prepend new report to state
    setReports((prev) => [newReport, ...prev]);
  };

  // Update status (e.g. resolve reports by staff)
  const updateReportStatus = (id, newStatus) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, status: newStatus } : report
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 font-sans antialiased text-gray-100 flex flex-col selection:bg-emerald-500 selection:text-gray-950">
      {/* Header (56px height) */}
      <header className="h-14 w-full border-b border-gray-800 bg-gray-950 flex items-center justify-between px-4 shrink-0">
        {/* Left branding */}
        <div className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-emerald-400 animate-pulse" />
          <span className="font-semibold text-white tracking-tight text-base sm:text-lg">
            Stadium Pulse
          </span>
          <span className="rounded bg-gray-800 px-2 py-0.5 text-[9px] font-bold text-gray-500 uppercase tracking-widest border border-gray-700">
            FIFA WC 2026
          </span>
        </div>

        {/* Right live clock */}
        <div className="text-xs text-gray-400 font-mono">
          {currentTime.toLocaleTimeString()}
        </div>
      </header>

      {/* ViewSwitcher tabs below header */}
      <ViewSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Global Warning Banner if Gemini API Key is missing */}
      {!isApiKeyConfigured && (
        <div className="bg-amber-500/10 border-b border-amber-500/25 px-4 py-2 text-xs text-amber-400 flex items-center justify-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 animate-pulse" />
          <span>Add your Gemini API key to .env to enable AI features</span>
        </div>
      )}

      {/* Main content area */}
      <main className="flex-1">
        {activeTab === "fan" && (
          <FanView
            reports={reports}
            addReport={addReport}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            selectedZoneFilter={selectedZoneFilter}
            setSelectedZoneFilter={setSelectedZoneFilter}
            geminiLogs={geminiLogs}
            setGeminiLogs={setGeminiLogs}
          />
        )}

        {activeTab === "ai" && (
          <AILayerView geminiLogs={geminiLogs} />
        )}

        {activeTab === "staff" && (
          <StaffDashboard
            reports={reports}
            updateReportStatus={updateReportStatus}
            selectedZoneFilter={selectedZoneFilter}
            setSelectedZoneFilter={setSelectedZoneFilter}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-900 bg-gray-950 py-4 flex items-center justify-center gap-1.5 text-xs text-gray-600">
        <span>Stadium Pulse • Built for FIFA World Cup 2026 • Powered by Gemini AI • Jai Johar!</span>
        <Trophy className="h-3.5 w-3.5 text-gray-700" />
      </footer>
    </div>
  );
}

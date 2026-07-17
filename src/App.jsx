import React, { useState } from "react";
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
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);

  // Add new report from fan
  const addReport = (newReportData) => {
    const newReport = {
      id: `rep-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: "pending",
      ...newReportData
    };
    
    // Prepend new report to state
    setReports((prev) => [newReport, ...prev]);
    
    // Simulate AI synthesis process with banner
    setIsAiAnalyzing(true);
    setTimeout(() => {
      setIsAiAnalyzing(false);
    }, 4500);
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
      {/* Top sticky switcher navigation */}
      <ViewSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main active view rendering */}
      <main className="flex-1 pb-16">
        {activeTab === "fan" && (
          <FanView
            reports={reports}
            addReport={addReport}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            selectedZoneFilter={selectedZoneFilter}
            setSelectedZoneFilter={setSelectedZoneFilter}
            isAiAnalyzing={isAiAnalyzing}
            setIsAiAnalyzing={setIsAiAnalyzing}
          />
        )}

        {activeTab === "ai" && (
          <AILayerView reports={reports} />
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
      <footer className="w-full border-t border-gray-900 bg-gray-950 py-6 text-center text-[10px] font-semibold tracking-wider text-gray-600">
        ⚽ FIFA WORLD CUP 2026 STADIUM PULSE • CROWD-SOURCED INTELLIGENCE
      </footer>
    </div>
  );
}

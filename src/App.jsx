import React, { useState, useEffect } from "react";
import { Radio, AlertTriangle } from "lucide-react";
import ViewSwitcher from "./components/ViewSwitcher";
import LiveActivityTicker from "./components/LiveActivityTicker";
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
  const [fanCount, setFanCount] = useState(41);

  // Clock — updates every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Live fan counter — randomly increments/decrements every 3-7 seconds
  useEffect(() => {
    const randomDelay = () => Math.floor(Math.random() * 4000) + 3000;
    let timeout;
    const tick = () => {
      setFanCount(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(35, Math.min(60, prev + delta));
      });
      timeout = setTimeout(tick, randomDelay());
    };
    timeout = setTimeout(tick, randomDelay());
    return () => clearTimeout(timeout);
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

  const timeStr = currentTime.toTimeString().slice(0, 8);

  return (
    <div
      className="min-h-screen flex flex-col antialiased text-white selection:bg-[#C9A84C] selection:text-[#050A1A]"
      style={{ backgroundColor: "#050A1A" }}
    >
      {/* ── Header 64px ── */}
      <header
        className="h-16 w-full flex items-center justify-between px-4 sm:px-6 shrink-0 z-50"
        style={{
          backgroundColor: "rgba(5,10,26,0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)"
        }}
      >
        {/* Left — Branding */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <Radio
              className="h-5 w-5 relative z-10"
              style={{ color: "#C9A84C" }}
            />
            <span
              className="absolute h-5 w-5 rounded-full animate-ping opacity-40"
              style={{ backgroundColor: "#C9A84C" }}
            />
          </div>
          <div className="flex items-center gap-1 tracking-[0.2em] text-sm font-bold uppercase">
            <span style={{ color: "#C9A84C" }}>STADIUM</span>
            <span className="text-white">PULSE</span>
          </div>
          <span
            className="rounded-full px-2 py-0.5 text-xs ml-1 font-semibold"
            style={{
              backgroundColor: "rgba(201,168,76,0.15)",
              border: "1px solid rgba(201,168,76,0.3)",
              color: "#C9A84C"
            }}
          >
            FIFA WC 2026
          </span>
        </div>

        {/* Center — Live Fan Counter */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
          </span>
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            Live •{" "}
            <span className="font-semibold text-white">{fanCount}</span> fans
            reporting
          </span>
        </div>

        {/* Right — Clock */}
        <div className="flex items-center gap-1.5">
          <span
            className="font-mono text-sm font-semibold"
            style={{ color: "#C9A84C" }}
          >
            {timeStr}
          </span>
          <span
            className="text-xs font-medium"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            IST
          </span>
        </div>
      </header>

      {/* ── Live Activity Ticker ── */}
      <LiveActivityTicker />

      {/* ── ViewSwitcher ── */}
      <ViewSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ── API Key Warning Banner ── */}
      {!isApiKeyConfigured && (
        <div
          className="flex items-center justify-center gap-2 px-4 py-2 text-xs"
          style={{
            backgroundColor: "rgba(245,158,11,0.08)",
            borderBottom: "1px solid rgba(245,158,11,0.15)",
            color: "#F59E0B"
          }}
        >
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 animate-pulse" />
          <span>
            Add your Gemini API key to .env to enable AI features — sandbox
            mode active
          </span>
        </div>
      )}

      {/* ── Main Content ── */}
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
        {activeTab === "ai" && <AILayerView geminiLogs={geminiLogs} />}
        {activeTab === "staff" && (
          <StaffDashboard
            reports={reports}
            updateReportStatus={updateReportStatus}
            selectedZoneFilter={selectedZoneFilter}
            setSelectedZoneFilter={setSelectedZoneFilter}
          />
        )}
      </main>

      {/* ── Footer ── */}
      <footer
        className="py-4 text-center tracking-wide"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          color: "rgba(255,255,255,0.15)",
          fontSize: "11px"
        }}
      >
        STADIUM PULSE &nbsp;•&nbsp; FIFA WORLD CUP 2026 &nbsp;•&nbsp; POWERED
        BY GEMINI AI &nbsp;•&nbsp; JAI JOHAR! 🏟️ &nbsp;•&nbsp; BUILT BY
        AYUSHMAN SHARMA
      </footer>
    </div>
  );
}

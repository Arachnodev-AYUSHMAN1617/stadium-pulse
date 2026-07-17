import React from "react";
import StadiumMap from "./StadiumMap";
import ReportPanel from "./ReportPanel";
import SustainabilityWidget from "./SustainabilityWidget";

export default function FanView({
  reports,
  addReport,
  selectedLanguage,
  setSelectedLanguage,
  selectedZoneFilter,
  setSelectedZoneFilter,
  geminiLogs,
  setGeminiLogs
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left column: Stadium Map */}
        <div className="lg:col-span-5">
          <StadiumMap
            reports={reports}
            selectedZone={selectedZoneFilter}
            onSelectZone={setSelectedZoneFilter}
          />
        </div>

        {/* Right column: Report Panel & Sustainability Widget */}
        <div className="lg:col-span-7">
          <ReportPanel
            reports={reports}
            addReport={addReport}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            selectedZoneFilter={selectedZoneFilter}
            setSelectedZoneFilter={setSelectedZoneFilter}
            geminiLogs={geminiLogs}
            setGeminiLogs={setGeminiLogs}
          />
          
          <SustainabilityWidget reports={reports} />
        </div>
      </div>
    </div>
  );
}

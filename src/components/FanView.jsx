import React, { useState } from "react";
import StadiumMap from "./StadiumMap";
import ReportPanel from "./ReportPanel";
import AlertBanner from "./AlertBanner";

export default function FanView({
  reports,
  addReport,
  selectedLanguage,
  setSelectedLanguage,
  selectedZoneFilter,
  setSelectedZoneFilter,
  isAiAnalyzing,
  setIsAiAnalyzing
}) {
  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6">
      {/* AI Alert Banner overlay */}
      <AlertBanner
        isVisible={isAiAnalyzing}
        onClose={() => setIsAiAnalyzing(false)}
        language={selectedLanguage}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Stadium Map Card */}
        <div className="lg:col-span-6 xl:col-span-5">
          <StadiumMap
            reports={reports}
            selectedZone={selectedZoneFilter}
            onSelectZone={setSelectedZoneFilter}
          />
        </div>

        {/* Report Controls Card */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-5 backdrop-blur-sm lg:col-span-6 xl:col-span-7">
          <ReportPanel
            reports={reports}
            addReport={addReport}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            selectedZoneFilter={selectedZoneFilter}
            setSelectedZoneFilter={setSelectedZoneFilter}
          />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Brain } from "lucide-react";
import stadiumZones from "../data/stadiumZones";

export default function AILayerView({ geminiLogs }) {
  const truncatedPrompt = (text) => {
    if (!text) return "";
    return text.length > 100 ? text.substring(0, 100) + "..." : text;
  };

  const getSeverityClass = (severity) => {
    if (!severity) return "text-emerald-400";
    const s = severity.toLowerCase();
    if (s === "high") return "text-red-500 font-bold";
    if (s === "medium") return "text-amber-400 font-bold";
    return "text-emerald-400 font-bold";
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 font-mono text-sm text-gray-300">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b border-gray-800 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
          </span>
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            Gemini 2.0 Flash — Live Pipeline Monitor
          </h2>
        </div>
        <span className="rounded bg-gray-900 border border-gray-800 px-3 py-1 text-xs text-gray-500">
          LOGS COUNT: {geminiLogs.length}
        </span>
      </div>

      {/* Main logs pipeline */}
      {geminiLogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-900/50 py-16 text-center">
          <Brain className="h-12 w-12 text-gray-600 mb-4 animate-pulse" />
          <p className="text-gray-500 max-w-xs">
            No AI calls yet. Submit a report in Fan View to see the pipeline.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {geminiLogs.slice(0, 5).map((log, index) => {
            const isError = log.response && log.response.error;
            const severity = log.response?.severity || "low";
            const severityColor = getSeverityClass(severity);
            const zoneName = stadiumZones.find(z => z.id === log.zone)?.name || log.zone;

            return (
              <div
                key={index}
                className="rounded-xl border border-gray-800 bg-gray-900 p-4 shadow-lg flex flex-col gap-3"
              >
                {/* Top metadata row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 pb-2.5 text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 font-bold">
                      [{new Date(log.timestamp).toLocaleTimeString()}]
                    </span>
                    <span className="text-white font-semibold">
                      {log.reportType}
                    </span>
                    <span className="text-gray-400">
                      Zone: {zoneName}
                    </span>
                  </div>
                  <span className="rounded bg-gray-950 px-2 py-0.5 text-[10px] font-bold text-gray-400 border border-gray-800 uppercase">
                    Lang: {log.language}
                  </span>
                </div>

                {/* Prompt block */}
                <div className="bg-gray-950 rounded-lg p-3 border border-gray-800">
                  <span className="text-gray-500 font-bold block mb-1">PROMPT →</span>
                  <p className="text-gray-300 font-mono text-xs whitespace-pre-wrap leading-relaxed select-all">
                    {truncatedPrompt(log.prompt)}
                  </p>
                </div>

                {/* Response JSON block */}
                <div className="bg-gray-950 rounded-lg p-3 border border-gray-800">
                  <span className="text-emerald-400 font-bold block mb-1">RESPONSE →</span>
                  {isError ? (
                    <pre className="text-red-500 font-mono text-xs leading-relaxed">
                      {JSON.stringify(log.response, null, 2)}
                    </pre>
                  ) : (
                    <pre className="text-gray-400 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
                      {"{\n"}
                      {`  "severity": `}
                      <span className={severityColor}>"{log.response.severity}"</span>
                      {",\n  \"fanAlert\": "}
                      <span className="text-white">"{log.response.fanAlert}"</span>
                      {",\n  \"staffAction\": "}
                      <span className="text-amber-400">"{log.response.staffAction}"</span>
                      {",\n  \"category\": "}
                      <span className="text-emerald-400">"{log.response.category}"</span>
                      {",\n  \"estimatedResolutionMins\": "}
                      <span className="text-indigo-400">{log.response.estimatedResolutionMins}</span>
                      {"\n}"}
                    </pre>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

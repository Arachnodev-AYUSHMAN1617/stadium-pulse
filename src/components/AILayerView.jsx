import React from "react";
import { Brain } from "lucide-react";
import stadiumZones from "../data/stadiumZones";

const GOLD = "#C9A84C";

export default function AILayerView({ geminiLogs }) {
  const truncatedPrompt = (text) => {
    if (!text) return "";
    return text.length > 100 ? text.substring(0, 100) + "..." : text;
  };

  const getSeverityColor = (severity) => {
    if (!severity) return "#22C55E";
    const s = severity.toLowerCase();
    if (s === "high") return "#FF4444";
    if (s === "medium") return "#F59E0B";
    return "#22C55E";
  };

  return (
    <div
      className="w-full font-mono"
      style={{ backgroundColor: "#020810" }}
    >
      {/* Terminal header bar */}
      <div
        className="flex items-center gap-2 px-4 py-2"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#FF5F56" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#FFBD2E" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#27C93F" }} />
        <span
          className="ml-2 text-xs tracking-widest"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          gemini-pipeline — bash
        </span>
      </div>

      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <span
          className="text-xs tracking-widest"
          style={{ color: "rgba(255,255,255,0.30)" }}
        >
          GEMINI 2.5 FLASH — LIVE PIPELINE MONITOR
        </span>
        {geminiLogs.length > 0 ? (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse inline-block" />
            <span className="text-xs text-green-400 font-semibold">ACTIVE</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full inline-block"
              style={{ backgroundColor: "rgba(255,255,255,0.20)" }}
            />
            <span
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.20)" }}
            >
              IDLE
            </span>
          </div>
        )}
      </div>

      {/* Logs or Empty State */}
      {geminiLogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Brain
            className="h-8 w-8"
            style={{ color: "rgba(255,255,255,0.10)" }}
          />
          <p
            className="text-sm mt-3"
            style={{ color: "rgba(255,255,255,0.20)" }}
          >
            No AI calls yet.
          </p>
          <p
            className="text-xs mt-1"
            style={{ color: "rgba(255,255,255,0.15)" }}
          >
            Submit a report in Fan View to see the pipeline.
          </p>
        </div>
      ) : (
        <div>
          {geminiLogs.slice(0, 5).map((log, index) => {
            const isError = log.response && log.response.error;
            const severity = log.response?.severity || "low";
            const sevColor = getSeverityColor(severity);
            const zoneName =
              stadiumZones.find((z) => z.id === log.zone)?.name || log.zone;

            return (
              <div key={index} className="glass-card p-4 mb-3 mx-4 mt-3">
                {/* Top row */}
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="text-xs font-mono"
                    style={{ color: GOLD }}
                  >
                    [{new Date(log.timestamp).toLocaleTimeString()}]
                  </span>
                  <span className="text-white/70 text-xs">|</span>
                  <span
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.70)" }}
                  >
                    {log.reportType}
                  </span>
                  <span className="text-white/70 text-xs">|</span>
                  <span
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.40)" }}
                  >
                    {zoneName}
                  </span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.10)",
                      color: "rgba(255,255,255,0.50)"
                    }}
                  >
                    {log.language}
                  </span>
                </div>

                {/* Prompt row */}
                <div className="mt-2" style={{ borderLeft: "2px solid rgba(201,168,76,0.40)", paddingLeft: "10px" }}>
                  <span
                    className="text-[10px] tracking-wider block"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    PROMPT →
                  </span>
                  <p
                    className="text-xs mt-1 font-mono leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {truncatedPrompt(log.prompt)}
                  </p>
                </div>

                {/* Response row */}
                <div
                  className="mt-2 p-2 rounded-lg"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                >
                  <span
                    className="text-[10px] tracking-wider block"
                    style={{ color: "rgba(201,168,76,0.60)" }}
                  >
                    RESPONSE →
                  </span>
                  {isError ? (
                    <pre
                      className="text-xs font-mono leading-relaxed mt-1"
                      style={{ color: "#FF4444" }}
                    >
                      {JSON.stringify(log.response, null, 2)}
                    </pre>
                  ) : (
                    <div className="mt-1 text-xs font-mono leading-relaxed">
                      <div>
                        <span style={{ color: "rgba(255,255,255,0.40)" }}>
                          severity:{" "}
                        </span>
                        <span style={{ color: sevColor }}>
                          "{log.response.severity}"
                        </span>
                      </div>
                      <div>
                        <span style={{ color: "rgba(255,255,255,0.40)" }}>
                          fanAlert:{" "}
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.80)" }}>
                          "{log.response.fanAlert}"
                        </span>
                      </div>
                      <div>
                        <span style={{ color: "rgba(255,255,255,0.40)" }}>
                          staffAction:{" "}
                        </span>
                        <span style={{ color: "rgba(245,158,11,0.70)" }}>
                          "{log.response.staffAction}"
                        </span>
                      </div>
                      <div>
                        <span style={{ color: "rgba(255,255,255,0.40)" }}>
                          estimatedResolutionMins:{" "}
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.40)" }}>
                          {log.response.estimatedResolutionMins}
                        </span>
                      </div>
                    </div>
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

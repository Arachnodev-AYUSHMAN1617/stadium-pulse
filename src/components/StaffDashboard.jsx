import React from "react";
import {
  Files,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  DoorOpen,
  Accessibility,
  Trash2,
  Bus,
  UtensilsCrossed,
  ShieldAlert,
  Droplets,
  UserX,
  Compass
} from "lucide-react";
import stadiumZones from "../data/stadiumZones";

const GOLD = "#C9A84C";

const reportIcons = {
  "Crowded Gate": DoorOpen,
  "Blocked Ramp": Accessibility,
  "Full Bin": Trash2,
  "Shuttle Delay": Bus,
  "Food Line": UtensilsCrossed,
  "Security Queue": ShieldAlert,
  "Water Station": Droplets,
  "Lost Person": UserX
};

export default function StaffDashboard({
  reports,
  updateReportStatus,
  selectedZoneFilter,
  setSelectedZoneFilter
}) {
  const totalCount = reports.length;
  const pendingCount = reports.filter((r) => r.status === "pending").length;
  const resolvedCount = reports.filter((r) => r.status === "resolved").length;

  const filteredReports = selectedZoneFilter
    ? reports.filter((r) => r.zone === selectedZoneFilter)
    : reports;

  const sortedReports = [...filteredReports].sort((a, b) => {
    if (a.status === "pending" && b.status === "resolved") return -1;
    if (a.status === "resolved" && b.status === "pending") return 1;
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  const getSeverityPill = (severity) => {
    const s = (severity || "low").toLowerCase();
    if (s === "high")
      return {
        bg: "rgba(255,68,68,0.15)",
        border: "rgba(255,68,68,0.20)",
        color: "#FF4444"
      };
    if (s === "medium")
      return {
        bg: "rgba(245,158,11,0.15)",
        border: "rgba(245,158,11,0.20)",
        color: "#F59E0B"
      };
    return {
      bg: "rgba(34,197,94,0.15)",
      border: "rgba(34,197,94,0.20)",
      color: "#22C55E"
    };
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-6 text-white">
      {/* Title + Zone Filter */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Incident Command Center
          </h2>
          <p
            className="text-xs mt-1"
            style={{ color: "rgba(255,255,255,0.40)" }}
          >
            Monitor real-time citizen alerts and suggested AI response actions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label
            className="text-xs font-semibold"
            style={{ color: "rgba(255,255,255,0.40)" }}
          >
            Filter Zone:
          </label>
          <select
            value={selectedZoneFilter || ""}
            onChange={(e) => setSelectedZoneFilter(e.target.value || null)}
            className="rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none min-h-[44px]"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)"
            }}
          >
            <option value="" style={{ backgroundColor: "#050A1A" }}>
              All Zones
            </option>
            {stadiumZones.map((z) => (
              <option
                key={z.id}
                value={z.id}
                style={{ backgroundColor: "#050A1A", color: "#ffffff" }}
              >
                {z.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-3">
        {/* Total */}
        <div className="glass-card p-4 relative">
          <Files
            className="absolute top-4 right-4 h-[18px] w-[18px]"
            style={{ color: "rgba(255,255,255,0.30)" }}
          />
          <div>
            <span
              className="text-3xl font-bold text-white count-animate block"
            >
              {totalCount}
            </span>
            <span
              className="text-xs mt-1 uppercase tracking-wider block"
              style={{ color: "rgba(255,255,255,0.40)" }}
            >
              Total Signals
            </span>
          </div>
          <div
            className="flex items-center gap-1 mt-1 text-[10px] font-bold"
            style={{ color: GOLD }}
          >
            <TrendingUp className="h-3 w-3" />
            <span>+8% last 10m</span>
          </div>
        </div>

        {/* Pending */}
        <div className="glass-card p-4 relative">
          <AlertTriangle
            className="absolute top-4 right-4 h-[18px] w-[18px]"
            style={{ color: "rgba(255,255,255,0.30)" }}
          />
          <div>
            <span
              className="text-3xl font-bold count-animate block"
              style={{ color: "#F59E0B" }}
            >
              {pendingCount}
            </span>
            <span
              className="text-xs mt-1 uppercase tracking-wider block"
              style={{ color: "rgba(255,255,255,0.40)" }}
            >
              Pending
            </span>
          </div>
          <div
            className="flex items-center gap-1 mt-1 text-[10px] font-bold"
            style={{ color: "#F59E0B" }}
          >
            <AlertTriangle className="h-3 w-3 animate-pulse" />
            <span>Needs triage</span>
          </div>
        </div>

        {/* Resolved */}
        <div className="glass-card p-4 relative">
          <CheckCircle
            className="absolute top-4 right-4 h-[18px] w-[18px]"
            style={{ color: "rgba(255,255,255,0.30)" }}
          />
          <div>
            <span
              className="text-3xl font-bold count-animate block"
              style={{ color: "#22C55E" }}
            >
              {resolvedCount}
            </span>
            <span
              className="text-xs mt-1 uppercase tracking-wider block"
              style={{ color: "rgba(255,255,255,0.40)" }}
            >
              Resolved
            </span>
          </div>
          <div
            className="flex items-center gap-1 mt-1 text-[10px] font-bold"
            style={{ color: "#22C55E" }}
          >
            <CheckCircle className="h-3 w-3" />
            <span>Clear status</span>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <p
        className="tracking-[0.25em] mb-4"
        style={{ fontSize: "10px", color: "rgba(255,255,255,0.30)" }}
      >
        INCIDENT COMMAND
      </p>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        {sortedReports.length === 0 ? (
          <div
            className="py-12 text-center text-sm"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            No incidents reported. All stations reporting green.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr
                  className="text-[10px] tracking-widest uppercase"
                  style={{
                    color: "rgba(255,255,255,0.25)",
                    backgroundColor: "rgba(5,10,26,0.85)",
                    backdropFilter: "blur(8px)",
                    position: "sticky",
                    top: 0,
                    zIndex: 1
                  }}
                >
                  <th className="px-4 py-3">Zone</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">AI Suggested Action</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedReports.map((report, index) => {
                  const zoneObj = stadiumZones.find((z) => z.id === report.zone);
                  const isPending = report.status === "pending";
                  const pill = getSeverityPill(report.severity);

                  return (
                    <tr
                      key={report.id}
                      className="transition-colors"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        backgroundColor:
                          index % 2 === 1
                            ? "rgba(255,255,255,0.015)"
                            : "transparent"
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgba(255,255,255,0.03)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          index % 2 === 1
                            ? "rgba(255,255,255,0.015)"
                            : "transparent")
                      }
                    >
                      <td
                        className="px-4 py-3 text-xs font-medium"
                        style={{ color: "#ffffff" }}
                      >
                        {zoneObj?.name || report.zone}
                      </td>
                      <td
                        className="px-4 py-3 text-xs"
                        style={{ color: "rgba(255,255,255,0.70)" }}
                      >
                        {report.type}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-block text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase"
                          style={{
                            backgroundColor: pill.bg,
                            border: `1px solid ${pill.border}`,
                            color: pill.color
                          }}
                        >
                          {report.severity || "low"}
                        </span>
                      </td>
                      <td
                        className="px-4 py-3 text-xs max-w-[200px] truncate"
                        style={{ color: "rgba(255,255,255,0.60)" }}
                        title={report.staffAction}
                      >
                        {report.staffAction || (
                          <span
                            className="italic"
                            style={{ color: "rgba(255,255,255,0.25)" }}
                          >
                            Awaiting AI...
                          </span>
                        )}
                      </td>
                      <td
                        className="px-4 py-3 text-xs"
                        style={{ color: "rgba(255,255,255,0.40)" }}
                      >
                        {new Date(report.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {isPending ? (
                          <button
                            onClick={() =>
                              updateReportStatus(report.id, "resolved")
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition cursor-pointer"
                            style={{
                              backgroundColor: "rgba(201,168,76,0.15)",
                              border: "1px solid rgba(201,168,76,0.30)",
                              color: GOLD
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "rgba(201,168,76,0.25)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "rgba(201,168,76,0.15)")
                            }
                          >
                            <CheckCircle className="h-3 w-3" />
                            <span>Resolve</span>
                          </button>
                        ) : (
                          <span
                            className="inline-flex items-center text-xs px-3 py-1.5 rounded-lg cursor-default"
                            style={{
                              backgroundColor: "rgba(34,197,94,0.10)",
                              border: "1px solid rgba(34,197,94,0.20)",
                              color: "rgba(34,197,94,0.60)"
                            }}
                          >
                            Resolved
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

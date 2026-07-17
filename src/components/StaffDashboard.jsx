import React from "react";
import {
  Files,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
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

// Report type icons map for the table
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
  // Stats calculations
  const totalCount = reports.length;
  const pendingCount = reports.filter((r) => r.status === "pending").length;
  const resolvedCount = reports.filter((r) => r.status === "resolved").length;

  // Filter reports
  const filteredReports = selectedZoneFilter
    ? reports.filter((r) => r.zone === selectedZoneFilter)
    : reports;

  // Sort: pending first, then newest first
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (a.status === "pending" && b.status === "resolved") return -1;
    if (a.status === "resolved" && b.status === "pending") return 1;
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  const getSeverityStyles = (severity) => {
    if (!severity) return "text-emerald-400 font-semibold";
    const s = severity.toLowerCase();
    if (s === "high") return "text-red-500 font-bold uppercase";
    if (s === "medium") return "text-amber-400 font-bold uppercase";
    return "text-emerald-400 font-semibold";
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 text-white">
      {/* Title */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Incident Command Center</h2>
          <p className="text-xs text-gray-400">
            Monitor real-time citizen alerts and suggested AI response actions.
          </p>
        </div>

        {/* Zone Filter Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-gray-400">Filter Zone:</label>
          <select
            value={selectedZoneFilter || ""}
            onChange={(e) => setSelectedZoneFilter(e.target.value || null)}
            className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none min-h-[44px]"
          >
            <option value="">All Zones</option>
            {stadiumZones.map((z) => (
              <option key={z.id} value={z.id}>
                {z.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total Reports */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 flex items-center justify-between shadow-md">
          <div>
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">
              Total Signals
            </span>
            <span className="text-3xl font-black text-white">{totalCount}</span>
            <div className="flex items-center gap-1 mt-1 text-[10px] text-sky-400 font-bold">
              <TrendingUp className="h-3 w-3" />
              <span>+8% last 10m</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
            <Files className="h-6 w-6" />
          </div>
        </div>

        {/* Pending Alerts */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 flex items-center justify-between shadow-md relative overflow-hidden">
          {pendingCount > 0 && (
            <div className="absolute top-0 right-0 h-1.5 w-full bg-gradient-to-r from-amber-500 to-amber-300"></div>
          )}
          <div>
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">
              Active Alerting
            </span>
            <span className="text-3xl font-black text-amber-400">{pendingCount}</span>
            <div className="flex items-center gap-1 mt-1 text-[10px] text-amber-400 font-bold">
              <AlertTriangle className="h-3 w-3 animate-pulse" />
              <span>Needs triage</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>

        {/* Resolved */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 flex items-center justify-between shadow-md">
          <div>
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">
              Resolved Signals
            </span>
            <span className="text-3xl font-black text-emerald-400">{resolvedCount}</span>
            <div className="flex items-center gap-1 mt-1 text-[10px] text-emerald-400 font-bold">
              <CheckCircle className="h-3 w-3" />
              <span>Clear status</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <CheckCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Reports Incident Command Table */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-4 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Incident Command board {selectedZoneFilter && `(${stadiumZones.find(z => z.id === selectedZoneFilter)?.name})`}
          </h3>
          <span className="text-[10px] text-gray-500 font-semibold uppercase">
            Live Feed Triaged
          </span>
        </div>

        {sortedReports.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-500">
            No incidents reported. All stations reporting green.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-800 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  <th className="py-3 px-2">Zone</th>
                  <th className="py-3 px-2">Type</th>
                  <th className="py-3 px-2 text-center">Icon</th>
                  <th className="py-3 px-2">Severity</th>
                  <th className="py-3 px-2">AI Suggested Action</th>
                  <th className="py-3 px-2">Time</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40 text-xs">
                {sortedReports.map((report) => {
                  const zoneObj = stadiumZones.find((z) => z.id === report.zone);
                  const isPending = report.status === "pending";
                  const TypeIcon = reportIcons[report.type] || Compass;
                  const severityClass = getSeverityStyles(report.severity);

                  return (
                    <tr
                      key={report.id}
                      className="hover:bg-gray-800/30 transition-all border-b border-gray-800"
                    >
                      <td className="py-4 px-2 font-medium text-white">
                        {zoneObj?.name || report.zone}
                      </td>
                      <td className="py-4 px-2 font-semibold text-gray-300">
                        {report.type}
                      </td>
                      <td className="py-4 px-2 text-center">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-950 border border-gray-800 text-emerald-400">
                          <TypeIcon className="h-4 w-4" />
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <span className={severityClass}>
                          {report.severity || "low"}
                        </span>
                      </td>
                      <td className="py-4 px-2 max-w-[220px] text-gray-300 truncate font-mono text-[11px]" title={report.staffAction}>
                        {report.staffAction || (
                          <span className="text-gray-500 italic">Awaiting AI analysis...</span>
                        )}
                      </td>
                      <td className="py-4 px-2 text-gray-500">
                        {new Date(report.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>
                      <td className="py-4 px-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-extrabold uppercase border ${
                            isPending
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          }`}
                        >
                          <span className={`h-1 w-1 rounded-full ${isPending ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
                          {isPending ? "Pending" : "Resolved"}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-right">
                        {isPending ? (
                          <button
                            onClick={() => updateReportStatus(report.id, "resolved")}
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-[10px] font-bold text-white transition-all shadow-md shadow-emerald-500/5 cursor-pointer min-h-[44px] sm:min-h-0"
                          >
                            <CheckCircle className="h-3 w-3" />
                            <span>Resolve</span>
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                            Closed
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

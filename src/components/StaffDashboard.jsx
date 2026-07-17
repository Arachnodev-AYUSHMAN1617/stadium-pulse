import React from "react";
import stadiumZones from "../data/stadiumZones";

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

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 text-white">
      {/* Title */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight">🛡️ Staff Security & Crowd Control Dashboard</h2>
          <p className="text-xs text-gray-400">
            Real-time reports triage and response coordination.
          </p>
        </div>

        {/* Zone Filter Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-gray-400">Filter Zone:</label>
          <select
            value={selectedZoneFilter || ""}
            onChange={(e) => setSelectedZoneFilter(e.target.value || null)}
            className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
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
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-4 text-center backdrop-blur-sm">
          <span className="block text-2xl font-black sm:text-3xl text-white">{totalCount}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Total Signals</span>
        </div>
        <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-4 text-center backdrop-blur-sm relative overflow-hidden">
          {pendingCount > 0 && (
            <span className="absolute right-2 top-2 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
            </span>
          )}
          <span className="block text-2xl font-black sm:text-3xl text-amber-400">{pendingCount}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Active Alerting</span>
        </div>
        <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-4 text-center backdrop-blur-sm">
          <span className="block text-2xl font-black sm:text-3xl text-emerald-400">{resolvedCount}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Resolved</span>
        </div>
      </div>

      {/* Reports Grid/Table */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-4 backdrop-blur-sm">
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
          📋 Incident Triage Board {selectedZoneFilter && `(${stadiumZones.find(z => z.id === selectedZoneFilter)?.name})`}
        </h3>

        {sortedReports.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-500">
            No incidents reported in this zone. All clear!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  <th className="py-3 px-2">ID</th>
                  <th className="py-3 px-2">Type</th>
                  <th className="py-3 px-2">Zone</th>
                  <th className="py-3 px-2">Reported</th>
                  <th className="py-3 px-2">Language</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-xs">
                {sortedReports.map((report) => {
                  const zoneObj = stadiumZones.find((z) => z.id === report.zone);
                  const isPending = report.status === "pending";

                  return (
                    <tr
                      key={report.id}
                      className="hover:bg-gray-800/20 transition-colors"
                    >
                      <td className="py-3 px-2 font-mono text-[10px] text-gray-500">
                        {report.id}
                      </td>
                      <td className="py-3 px-2 font-bold text-white flex items-center gap-1.5">
                        <span>{report.type}</span>
                      </td>
                      <td className="py-3 px-2 text-gray-300">
                        {zoneObj?.name || report.zone}
                      </td>
                      <td className="py-3 px-2 text-gray-400">
                        {new Date(report.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>
                      <td className="py-3 px-2">
                        <span className="rounded bg-gray-950 px-2 py-0.5 text-[9px] font-bold text-gray-500 border border-gray-800 uppercase">
                          {report.language}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-extrabold uppercase border ${
                            isPending
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/25"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                          }`}
                        >
                          <span className={`h-1 w-1 rounded-full ${isPending ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
                          {isPending ? "Pending" : "Resolved"}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        {isPending ? (
                          <button
                            onClick={() => updateReportStatus(report.id, "resolved")}
                            className="rounded-lg bg-emerald-500 px-3 py-1 text-[10px] font-black text-gray-950 hover:bg-emerald-400 hover:shadow-md hover:shadow-emerald-500/10 transition-all cursor-pointer"
                          >
                            Resolve
                          </button>
                        ) : (
                          <span className="text-[10px] font-semibold text-gray-500">
                            Closed ✓
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

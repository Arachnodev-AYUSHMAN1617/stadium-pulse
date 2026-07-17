import React from "react";
import stadiumZones from "../data/stadiumZones";

export default function AILayerView({ reports }) {
  const pendingCount = reports.filter((r) => r.status === "pending").length;

  const systemPrompt = `You are a Stadium Intelligence AI assistant for FIFA World Cup 2026.
Your job is to read raw crowd-sourced fan reports in multiple languages (English, Spanish, Hindi, Arabic, Chhattisgarhi),
cross-reference them with zone coordinates/densities, resolve naming ambiguities,
and produce structured, actionable emergency and crowd-control alerts.

Format your output EXACTLY as a JSON object:
{
  "criticalAlert": boolean,
  "headline": string (short alert title in fan's language),
  "detailedMessage": string (detailed description of what's happening and advice),
  "recommendedAction": string (action plan for staff),
  "urgencyScore": number (1-10)
}`;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 text-white">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight">🤖 Gemini AI Synthesis Layer</h2>
        <p className="text-xs text-gray-400">
          Day 1 Prototype: Configured endpoints and system prompt schemas.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left Column: API Config */}
        <div className="space-y-6 md:col-span-1">
          <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-5 backdrop-blur-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              ⚡ Model Config
            </h3>
            <div className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="text-gray-500 font-bold block mb-1">Target Endpoint</label>
                <div className="font-mono bg-gray-950 px-2.5 py-1.5 rounded border border-gray-800 break-all select-all">
                  gemini-2.0-flash
                </div>
              </div>
              <div>
                <label className="text-gray-500 font-bold block mb-1">API Key Env</label>
                <div className="font-mono bg-gray-950 px-2.5 py-1.5 rounded border border-gray-800 text-amber-500">
                  VITE_GEMINI_API_KEY
                </div>
              </div>
              <div>
                <label className="text-gray-500 font-bold block mb-1">Status</label>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-black text-emerald-400 border border-emerald-500/25">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  READY
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-5 backdrop-blur-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-sky-400">
              📊 Live Pipe Metrics
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div className="rounded-lg bg-gray-950 p-3 border border-gray-800/60">
                <span className="block text-2xl font-black text-white">{reports.length}</span>
                <span className="text-[10px] text-gray-500 uppercase font-bold">Total Signals</span>
              </div>
              <div className="rounded-lg bg-gray-950 p-3 border border-gray-800/60">
                <span className="block text-2xl font-black text-amber-400">{pendingCount}</span>
                <span className="text-[10px] text-gray-500 uppercase font-bold">Unprocessed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Prompt & Real-time Logs */}
        <div className="space-y-6 md:col-span-2">
          {/* Prompt Schema */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-5 backdrop-blur-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              📝 System Prompt (Instructions)
            </h3>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-950 p-3.5 font-mono text-[10px] leading-relaxed text-gray-300 border border-gray-800/80 whitespace-pre-wrap">
              {systemPrompt}
            </pre>
          </div>

          {/* Synthetic Logs */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-5 backdrop-blur-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              📟 Active Pipeline Logs
            </h3>
            <div className="mt-3 space-y-2 font-mono text-[10px] text-gray-400">
              <div className="rounded bg-gray-950 p-3 border border-gray-800/60 max-h-52 overflow-y-auto space-y-1.5">
                <div>[INFO] {new Date().toISOString()} - System initialised. Listening to client event hooks...</div>
                <div>[INFO] Loaded {stadiumZones.length} Zone coordinate references successfully.</div>
                <div>[INFO] Seeded {reports.length} report inputs dynamically to local storage.</div>
                {reports.slice(-3).map((r, i) => (
                  <div key={i} className="text-emerald-400">
                    [SIGNAL] Raw report captured! ID: {r.id} | Zone: {r.zone} | Type: {r.type} | Lang: {r.language.toUpperCase()}
                  </div>
                ))}
                <div>[INFO] Awaiting Day 2 API implementation to begin content token streams...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

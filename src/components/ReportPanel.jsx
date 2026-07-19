import React, { useState } from "react";
import {
  DoorOpen,
  Accessibility,
  Trash2,
  Bus,
  UtensilsCrossed,
  ShieldAlert,
  Droplets,
  UserX,
  AlertTriangle,
  Loader2,
  Compass
} from "lucide-react";
import stadiumZones from "../data/stadiumZones";
import AlertBanner from "./AlertBanner";

const GOLD = "#C9A84C";
const GOLD_BG = "rgba(201,168,76,0.10)";
const GOLD_BORDER = "rgba(201,168,76,0.50)";

// ── Translations (unchanged) ──────────────────────────────────────────────────
const translations = {
  en: {
    reportTitle: "Report a Condition",
    selectZonePrompt: "Where is this happening?",
    chooseZonePlaceholder: "Select a Stadium Zone...",
    submitBtn: "Submit Report",
    recentFeedTitle: "Recent Intelligence",
    noReports: "No reports filed yet.",
    filteringZone: "Filtering by",
    clearFilter: "Clear Filter",
    justNow: "just now",
    minAgo: "m ago",
    hrAgo: "h ago",
    pending: "Pending",
    resolved: "Resolved",
    selectCategory: "Select a category above to begin report",
    statusText: "Status",
    zoneLabel: "Zone",
    timeLabel: "Reported"
  },
  hi: {
    reportTitle: "स्थिति की रिपोर्ट करें",
    selectZonePrompt: "यह कहाँ हो रहा है?",
    chooseZonePlaceholder: "स्टेडियम क्षेत्र चुनें...",
    submitBtn: "रिपोर्ट जमा करें",
    recentFeedTitle: "हालिया लाइव रिपोर्ट",
    noReports: "अभी तक कोई रिपोर्ट नहीं है।",
    filteringZone: "फिल्टर किया गया",
    clearFilter: "फिल्टर हटाएं",
    justNow: "अभी-अभी",
    minAgo: "मिनट पहले",
    hrAgo: "घंटे पहले",
    pending: "लंबित",
    resolved: "समाधान",
    selectCategory: "रिपोर्ट शुरू करने के लिए ऊपर एक स्थिति चुनें",
    statusText: "स्थिति",
    zoneLabel: "क्षेत्र",
    timeLabel: "समय"
  },
  es: {
    reportTitle: "Reportar una Condición",
    selectZonePrompt: "¿Dónde está sucediendo esto?",
    chooseZonePlaceholder: "Seleccione una zona del estadio...",
    submitBtn: "Enviar Reporte",
    recentFeedTitle: "Inteligencia Reciente",
    noReports: "No hay reportes enviados.",
    filteringZone: "Filtrando por",
    clearFilter: "Limpiar Filtro",
    justNow: "ahora mismo",
    minAgo: "m antes",
    hrAgo: "h antes",
    pending: "Pendiente",
    resolved: "Resuelto",
    selectCategory: "Seleccione una categoría arriba para comenzar",
    statusText: "Estado",
    zoneLabel: "Zona",
    timeLabel: "Reportado"
  },
  ar: {
    reportTitle: "الإبلاغ عن حالة",
    selectZonePrompt: "أين يحدث هذا؟",
    chooseZonePlaceholder: "اختر منطقة بالملعب...",
    submitBtn: "إرسال البلاغ",
    recentFeedTitle: "التقارير الأخيرة",
    noReports: "لا توجد بلاغات حتى الآن.",
    filteringZone: "تصفية حسب",
    clearFilter: "مسح التصفية",
    justNow: "الآن",
    minAgo: "دقيقة مضت",
    hrAgo: "ساعة مضت",
    pending: "قيد الانتظار",
    resolved: "تم الحل",
    selectCategory: "اختر نوع البلاغ أعلاه للبدء",
    statusText: "الحالة",
    zoneLabel: "المنطقة",
    timeLabel: "وقت الإبلاغ"
  },
  cg: {
    reportTitle: "हाल-चाल के रपोट करव",
    selectZonePrompt: "ए कोन डहार होत हे?",
    chooseZonePlaceholder: "स्टेडियम के कोंटा चुनव...",
    submitBtn: "रिपोर्ट भेजव",
    recentFeedTitle: "अभीच्च के खबर",
    noReports: "अभी तक कोनो रिपोर्ट नई आये हे।",
    filteringZone: "कोंटा के आधार पर",
    clearFilter: "फिल्टर साफ करव",
    justNow: "अभीच्चे",
    minAgo: "मिनट पहिली",
    hrAgo: "घंटा पहिली",
    pending: "चलत हे",
    resolved: "टर गे",
    selectCategory: "रिपोर्ट करे बर ऊपर कोनो एक हाल-चाल चुनव",
    statusText: "हाल",
    zoneLabel: "कोंटा",
    timeLabel: "टेम"
  }
};

// ── Report type definitions (unchanged) ──────────────────────────────────────
const reportTypes = [
  { id: "Crowded Gate", Icon: DoorOpen, translationKeys: { en: "Crowded Gate", hi: "भीड़भाड़ वाला गेट", es: "Puerta Abarrotada", ar: "بوابة مزدحمة", cg: "भेर-भार वाले कपाट" } },
  { id: "Blocked Ramp", Icon: Accessibility, translationKeys: { en: "Blocked Ramp", hi: "अवरुद्ध रैंप", es: "Rampa Bloqueada", ar: "منحدر مغلق", cg: "धंधाये रैंप" } },
  { id: "Full Bin", Icon: Trash2, translationKeys: { en: "Full Bin", hi: "भरा हुआ कचरा डिब्बा", es: "Contenedor Lleno", ar: "سلة مهملات ممتلئة", cg: "कचरा डब्बा भरागे" } },
  { id: "Shuttle Delay", Icon: Bus, translationKeys: { en: "Shuttle Delay", hi: "शटल सेवा में देरी", es: "Retraso de Bus", ar: "تأخر الحافلة", cg: "शटल गाड़ी म देरी" } },
  { id: "Food Line", Icon: UtensilsCrossed, translationKeys: { en: "Food Line", hi: "भोजन की लंबी कतार", es: "Fila de Comida", ar: "طابور الطعام", cg: "खाए बर लाइन" } },
  { id: "Security Queue", Icon: ShieldAlert, translationKeys: { en: "Security Queue", hi: "सुरक्षा जांच कतार", es: "Fila de Seguridad", ar: "طابور الأमन", cg: "सुरक्षा जांच बर लाइन" } },
  { id: "Water Station", Icon: Droplets, translationKeys: { en: "Water Station", hi: "पेयजल केंद्र", es: "Estación de Agua", ar: "محطة مياه", cg: "पानी टंकी" } },
  { id: "Lost Person", Icon: UserX, translationKeys: { en: "Lost Person", hi: "खोया हुआ व्यक्ति", es: "Persona Perdida", ar: "شخص مفقود", cg: "गवांए मनखे" } }
];

export default function ReportPanel({
  reports,
  addReport,
  selectedLanguage,
  setSelectedLanguage,
  selectedZoneFilter,
  setSelectedZoneFilter,
  geminiLogs,
  setGeminiLogs
}) {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedZone, setSelectedZone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState(null);

  const t = translations[selectedLanguage] || translations.en;
  const isRtl = selectedLanguage === "ar";

  // ── Gemini API key check (logic unchanged) ────────────────────────────────
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const isApiKeyConfigured = apiKey && apiKey !== "your_key_here";

  // ── Submit handler with Gemini call (logic unchanged) ─────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedType || !selectedZone) return;

    setIsLoading(true);
    setIsAlertVisible(true);
    setAlertData(null);

    const reportType = selectedType;
    const language = selectedLanguage;
    const zoneName = stadiumZones.find(z => z.id === selectedZone)?.name || selectedZone;

    const promptText = `You are an AI operations assistant for FIFA World Cup 2026 
stadium management. A fan has submitted a real-time report.

Report details:
- Type: ${reportType}
- Zone: ${zoneName}
- Language preference: ${language}
- Time: ${new Date().toLocaleTimeString()}

You must respond with a JSON object only, no markdown, no explanation. 
Format:
{
  "severity": "low" | "medium" | "high",
  "fanAlert": "short message to show the fan in their language (${language})",
  "staffAction": "specific instruction for the nearest staff member",
  "category": "navigation" | "accessibility" | "crowd" | "sustainability" | "transport" | "security",
  "estimatedResolutionMins": number
}

CRITICAL LANGUAGE INSTRUCTION:
The fan's language preference is: ${language}
You MUST write the fanAlert field in this exact language:
- en → English
- hi → हिंदी (Hindi script, Devanagari)
- es → Español
- ar → العربية (Arabic script, RTL)
- cg → छत्तीसगढ़ी (Chhattisgarhi language, Devanagari script)
      Example Chhattisgarhi phrases:
      "गेट C मा भीड़ बाढ़त हे, कृपया गेट A के तरफ जावव"
      "स्टाफ ला जानकारी दे दे गे हे, थोकन रुकव"
      "तोर रपोट मिलगे, जल्दी मदद आही"
      ONLY Chhattisgarhi in fanAlert when cg is selected. No English.`;

    let apiResult = null;
    let logResponse = null;

    if (!isApiKeyConfigured) {
      await new Promise(r => setTimeout(r, 2000));
      apiResult = {
        severity: "medium",
        fanAlert: language === "cg" ? "कृप्या ध्यान देव, रपोट दर्ज होगे हे।" : "Report filed. AI sandbox mode.",
        staffAction: `Inspect ${zoneName} for ${reportType}. Check safety guidelines.`,
        category: "navigation",
        estimatedResolutionMins: 15
      };
      logResponse = apiResult;
    } else {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }],
              generationConfig: { temperature: 0.3, maxOutputTokens: 300 }
            })
          }
        );
        if (!response.ok) throw new Error(`Gemini API error: ${response.statusText}`);
        const data = await response.json();
        let rawText = data.candidates[0].content.parts[0].text;
        rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
        apiResult = JSON.parse(rawText);
        logResponse = apiResult;
      } catch (err) {
        console.error("Gemini fetch failed:", err);
        apiResult = {
          severity: "high",
          fanAlert: "Error processing report. Please alert nearest security staff directly.",
          staffAction: `URGENT check required at ${zoneName}: ${reportType}`,
          category: "security",
          estimatedResolutionMins: 5
        };
        logResponse = { error: err.message };
      }
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      reportType,
      zone: selectedZone,
      language,
      prompt: promptText,
      response: logResponse
    };
    setGeminiLogs(prev => [logEntry, ...prev]);

    setAlertData(apiResult);
    setIsLoading(false);

    addReport({
      type: reportType,
      zone: selectedZone,
      language,
      staffAction: apiResult.staffAction,
      severity: apiResult.severity
    });

    setSelectedType(null);
    setSelectedZone("");
  };

  // ── Helpers (unchanged) ───────────────────────────────────────────────────
  const formatTimeAgo = (isoString) => {
    const elapsed = Date.now() - new Date(isoString).getTime();
    if (elapsed < 10000) return t.justNow;
    const minutes = Math.floor(elapsed / 60000);
    if (minutes < 60) return `${minutes}${t.minAgo}`;
    return `${Math.floor(minutes / 60)}${t.hrAgo}`;
  };

  const filteredReports = selectedZoneFilter
    ? reports.filter((r) => r.zone === selectedZoneFilter)
    : reports;

  const recentReports = [...filteredReports]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);

  const getSeverityIconColor = (severity) => {
    if (!severity) return "#22C55E";
    const s = severity.toLowerCase();
    if (s === "high") return "#FF4444";
    if (s === "medium") return "#F59E0B";
    return "#22C55E";
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      style={{ direction: isRtl ? "rtl" : "ltr" }}
      className="relative flex flex-col gap-5 w-full"
    >
      {/* Alert Banner overlays top of card */}
      <AlertBanner
        isVisible={isAlertVisible}
        isLoading={isLoading}
        alertData={alertData}
        onClose={() => setIsAlertVisible(false)}
      />

      {/* ── Language Selector ── */}
      <div>
        <p
          className="mb-2 tracking-widest"
          style={{ fontSize: "10px", color: "rgba(255,255,255,0.30)" }}
        >
          LANGUAGE
        </p>
        <div className="flex flex-wrap gap-1.5">
          {[
            { code: "en", label: "EN" },
            { code: "hi", label: "HI" },
            { code: "es", label: "ES" },
            { code: "ar", label: "AR" },
            { code: "cg", label: "CG•छ", tooltip: "Chhattisgarhi — छत्तीसगढ़ी" }
          ].map((lang) => {
            const isActive = selectedLanguage === lang.code;
            return (
              <div key={lang.code} className="relative group/lang">
                <button
                  onClick={() => setSelectedLanguage(lang.code)}
                  title={lang.tooltip || undefined}
                  className="rounded-full px-3 py-1 text-xs font-medium transition-all min-h-[36px] cursor-pointer"
                  style={
                    isActive
                      ? {
                          backgroundColor: GOLD,
                          border: `1px solid ${GOLD}`,
                          color: "#050A1A",
                          fontWeight: 600,
                          boxShadow: "0 0 20px rgba(201,168,76,0.2)"
                        }
                      : {
                          backgroundColor: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          color: "rgba(255,255,255,0.50)"
                        }
                  }
                >
                  {lang.label}
                </button>
                {lang.tooltip && (
                  <div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover/lang:block whitespace-nowrap rounded-lg px-2 py-1 text-[10px] z-30 shadow-xl pointer-events-none"
                    style={{
                      backgroundColor: "rgba(5,10,26,0.95)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      color: "rgba(255,255,255,0.7)"
                    }}
                  >
                    {lang.tooltip}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Report Panel Card ── */}
      <div className="glass-card p-5">
        <p
          className="tracking-[0.2em] mb-4"
          style={{ fontSize: "10px", color: "rgba(255,255,255,0.30)" }}
        >
          REPORT A CONDITION
        </p>

        {/* 8 report type buttons 2×4 */}
        <div className="grid grid-cols-2 gap-2">
          {reportTypes.map((type) => {
            const isSelected = selectedType === type.id;
            const label = type.translationKeys[selectedLanguage] || type.translationKeys.en;
            const IconComponent = type.Icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className="flex flex-col items-center gap-2 rounded-xl p-3 transition-all duration-150 cursor-pointer min-h-[44px] shimmer-sweep"
                style={
                  isSelected
                    ? {
                        backgroundColor: GOLD_BG,
                        border: `1px solid ${GOLD_BORDER}`,
                        boxShadow: "0 0 20px rgba(201,168,76,0.15)"
                      }
                    : {
                        backgroundColor: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)"
                      }
                }
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.10)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)";
                  }
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  }
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <IconComponent
                  className="h-5 w-5"
                  style={{ color: isSelected ? GOLD : "rgba(255,255,255,0.50)" }}
                />
                <span
                  className="text-xs font-medium text-center leading-tight"
                  style={{ color: isSelected ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.60)" }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Zone + Submit form */}
        {selectedType && (
          <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3">
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              required
              className="w-full rounded-lg px-3 py-2 text-sm transition-colors focus:outline-none min-h-[44px]"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: selectedZone ? "#ffffff" : "rgba(255,255,255,0.4)"
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.50)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.10)")}
            >
              <option value="" disabled style={{ backgroundColor: "#050A1A" }}>
                {t.chooseZonePlaceholder}
              </option>
              {stadiumZones.map((zone) => (
                <option
                  key={zone.id}
                  value={zone.id}
                  style={{ backgroundColor: "#050A1A", color: "#ffffff" }}
                >
                  {zone.name}
                </option>
              ))}
            </select>

            {/* API key warning */}
            {!isApiKeyConfigured && (
              <div
                className="flex items-start gap-2 rounded-xl px-3 py-2.5 text-xs"
                style={{
                  backgroundColor: "rgba(245,158,11,0.08)",
                  border: "1px solid rgba(245,158,11,0.15)",
                  color: "#F59E0B"
                }}
              >
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>
                  Add your Gemini API key to .env to enable AI features.
                  Simulated responses will be used.
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={!selectedZone || isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all min-h-[44px] shimmer-sweep"
              style={
                selectedZone && !isLoading
                  ? {
                      backgroundColor: GOLD,
                      color: "#050A1A",
                      cursor: "pointer"
                    }
                  : {
                      backgroundColor: "rgba(201,168,76,0.50)",
                      color: "rgba(5,10,26,0.70)",
                      cursor: "not-allowed"
                    }
              }
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>{isLoading ? "Analyzing..." : t.submitBtn}</span>
            </button>
          </form>
        )}
      </div>

      {/* ── Recent Intelligence Feed ── */}
      <div className="glass-card p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
            <span
              className="tracking-widest font-semibold"
              style={{ fontSize: "10px", color: "rgba(255,255,255,0.30)" }}
            >
              RECENT INTELLIGENCE
            </span>
            <span className="text-green-400 text-[10px] font-bold">LIVE</span>
          </div>
          {selectedZoneFilter && (
            <button
              onClick={() => setSelectedZoneFilter(null)}
              className="text-[10px] font-bold cursor-pointer"
              style={{ color: GOLD }}
            >
              {t.clearFilter}
            </button>
          )}
        </div>

        {recentReports.length === 0 ? (
          <p
            className="py-3 text-center text-xs"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {t.noReports}
          </p>
        ) : (
          <div>
            {recentReports.map((report, i) => {
              const zoneObj = stadiumZones.find((z) => z.id === report.zone);
              const typeObj = reportTypes.find((t) => t.id === report.type);
              const typeLabel = typeObj
                ? typeObj.translationKeys[selectedLanguage] || typeObj.translationKeys.en
                : report.type;
              const Icon = typeObj?.Icon || Compass;
              const isPending = report.status === "pending";
              const iconColor = getSeverityIconColor(report.severity);

              return (
                <div
                  key={report.id}
                  className="flex items-center gap-3 py-2.5"
                  style={{
                    borderBottom:
                      i < recentReports.length - 1
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "none"
                  }}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: iconColor }} />
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-xs font-medium truncate"
                      style={{ color: "rgba(255,255,255,0.80)" }}
                    >
                      {typeLabel}
                    </div>
                    <div
                      className="text-[10px] mt-0.5 truncate"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {zoneObj?.name || report.zone} •{" "}
                      {formatTimeAgo(report.timestamp)}
                    </div>
                  </div>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap"
                    style={
                      isPending
                        ? {
                            backgroundColor: "rgba(245,158,11,0.10)",
                            border: "1px solid rgba(245,158,11,0.20)",
                            color: "#F59E0B"
                          }
                        : {
                            backgroundColor: "rgba(34,197,94,0.10)",
                            border: "1px solid rgba(34,197,94,0.20)",
                            color: "#22C55E"
                          }
                    }
                  >
                    {isPending ? t.pending : t.resolved}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

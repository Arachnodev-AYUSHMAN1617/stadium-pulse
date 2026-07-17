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
  XCircle,
  Compass
} from "lucide-react";
import stadiumZones from "../data/stadiumZones";
import AlertBanner from "./AlertBanner";

// Translations dictionary
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
    selectZonePrompt: "इहा कहाँ होवत हे?",
    chooseZonePlaceholder: "स्टेडियम के कोना चुनव...",
    submitBtn: "रपोट भेजव",
    recentFeedTitle: "अभी के खबर",
    noReports: "अभी तक कोनो रपोट नई आये हे।",
    filteringZone: "कोना के आधार पर",
    clearFilter: "फिल्टर साफ करव",
    justNow: "अभी-अभी",
    minAgo: "मिनट पहिली",
    hrAgo: "घंटा पहिली",
    pending: "रुके हे",
    resolved: "बनगे",
    selectCategory: "रपोट चालू करे बर ऊपर कोनो एक हाल-चाल चुनव",
    statusText: "हाल",
    zoneLabel: "कोना",
    timeLabel: "टेम"
  }
};

// Report type buttons with Lucide React Icons
const reportTypes = [
  { id: "Crowded Gate", Icon: DoorOpen, translationKeys: { en: "Crowded Gate", hi: "भीड़भाड़ वाला गेट", es: "Puerta Abarrotada", ar: "بوابة مزدحمة", cg: "भीड़भाड़ वाला फाटक" } },
  { id: "Blocked Ramp", Icon: Accessibility, translationKeys: { en: "Blocked Ramp", hi: "अवरुद्ध रैंप", es: "Rampa Bloqueada", ar: "منحدر مغلق", cg: "घेरायल रैंप" } },
  { id: "Full Bin", Icon: Trash2, translationKeys: { en: "Full Bin", hi: "भरा हुआ कचरा डिब्बा", es: "Contenedor Lleno", ar: "سلة مهملات ممتلئة", cg: "कचरा पेटी भरगे" } },
  { id: "Shuttle Delay", Icon: Bus, translationKeys: { en: "Shuttle Delay", hi: "शटल सेवा में देरी", es: "Retraso de Bus", ar: "تأخر الحافلة", cg: "शटल गाड़ी देरी" } },
  { id: "Food Line", Icon: UtensilsCrossed, translationKeys: { en: "Food Line", hi: "भोजन की लंबी कतार", es: "Fila de Comida", ar: "طابور الطعام", cg: "खाए के लाइन" } },
  { id: "Security Queue", Icon: ShieldAlert, translationKeys: { en: "Security Queue", hi: "सुरक्षा जांच कतार", es: "Fila de Seguridad", ar: "طابور الأمن", cg: "सुरक्षा जांच लाइन" } },
  { id: "Water Station", Icon: Droplets, translationKeys: { en: "Water Station", hi: "पेयजल केंद्र", es: "Estación de Agua", ar: "محطة मياه", cg: "पानी टंकी" } },
  { id: "Lost Person", Icon: UserX, translationKeys: { en: "Lost Person", hi: "खोया हुआ व्यक्ति", es: "Persona Perdida", ar: "شخص مفقود", cg: "हराय गे मनखे" } }
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

  // Check if API Key is configured
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const isApiKeyConfigured = apiKey && apiKey !== "your_key_here";

  // Form submit handler - wires real Gemini API calls
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

For language codes: en=English, hi=Hindi, es=Spanish, ar=Arabic, 
cg=Chhattisgarhi (write fanAlert in that language).
Chhattisgarhi is spoken in Chhattisgarh, India — use simple 
Chhattisgarhi phrases for the fanAlert when cg is selected.`;

    let apiResult = null;
    let logResponse = null;

    if (!isApiKeyConfigured) {
      // Key missing simulation fallback
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
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: promptText }]
              }],
              generationConfig: { temperature: 0.3, maxOutputTokens: 300 }
            })
          }
        );

        if (!response.ok) {
          throw new Error(`Gemini API error: ${response.statusText}`);
        }

        const data = await response.json();
        let rawText = data.candidates[0].content.parts[0].text;
        
        // Clean markdown format if returned
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

    // Add entry to Gemini live pipeline logs
    const logEntry = {
      timestamp: new Date().toISOString(),
      reportType,
      zone: selectedZone,
      language,
      prompt: promptText,
      response: logResponse
    };
    setGeminiLogs(prev => [logEntry, ...prev]);

    // Save alert data locally
    setAlertData(apiResult);
    setIsLoading(false);

    // Call shared state to insert report with staffAction and severity metadata
    addReport({
      type: reportType,
      zone: selectedZone,
      language,
      staffAction: apiResult.staffAction,
      severity: apiResult.severity
    });

    // Reset inputs
    setSelectedType(null);
    setSelectedZone("");
  };

  // Helper to format time relative to now
  const formatTimeAgo = (isoString) => {
    const elapsed = Date.now() - new Date(isoString).getTime();
    if (elapsed < 10000) return t.justNow;
    const minutes = Math.floor(elapsed / 60000);
    if (minutes < 60) return `${minutes}${t.minAgo}`;
    const hours = Math.floor(minutes / 60);
    return `${hours}${t.hrAgo}`;
  };

  // Filtered reports for feed
  const filteredReports = selectedZoneFilter
    ? reports.filter((r) => r.zone === selectedZoneFilter)
    : reports;

  const recentReports = [...filteredReports]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);

  const getSeverityColor = (severity) => {
    if (!severity) return "text-emerald-400";
    const s = severity.toLowerCase();
    if (s === "high") return "text-red-500";
    if (s === "medium") return "text-amber-400";
    return "text-emerald-400";
  };

  return (
    <div
      style={{ direction: isRtl ? "rtl" : "ltr" }}
      className="relative flex flex-col gap-6 w-full text-white bg-gray-900 border border-gray-800 rounded-2xl p-5"
    >
      {/* Alert Banner overlays inside Report Panel container */}
      <AlertBanner
        isVisible={isAlertVisible}
        isLoading={isLoading}
        alertData={alertData}
        onClose={() => setIsAlertVisible(false)}
      />

      {/* Top Section with Language Selector */}
      <div className="flex flex-col justify-between items-start gap-4 border-b border-gray-800 pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white">{t.reportTitle}</h2>
          <p className="text-xs text-gray-400">
            {selectedZoneFilter
              ? `${t.filteringZone}: ${stadiumZones.find((z) => z.id === selectedZoneFilter)?.name}`
              : t.selectCategory}
          </p>
        </div>

        {/* Language selector */}
        <div className="flex flex-wrap gap-1.5 self-end sm:self-auto">
          {[
            { code: "en", label: "EN" },
            { code: "hi", label: "HI" },
            { code: "es", label: "ES" },
            { code: "ar", label: "AR" },
            { code: "cg", label: "CG", tooltip: "Chhattisgarhi — छत्तीसगढ़ी" }
          ].map((lang) => (
            <div key={lang.code} className="relative group/tooltip">
              <button
                onClick={() => setSelectedLanguage(lang.code)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all border min-h-[44px] ${
                  selectedLanguage === lang.code
                    ? "bg-emerald-500 text-black border-emerald-500 font-bold"
                    : "bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {lang.label}
              </button>
              {lang.tooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block bg-gray-950 text-white text-[10px] py-1 px-2 rounded border border-gray-800 whitespace-nowrap z-30 shadow-lg font-sans">
                  {lang.tooltip}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grid of 8 Tap Buttons (Lucide Icons, No Emojis) */}
      <div className="grid grid-cols-2 gap-3">
        {reportTypes.map((type) => {
          const isSelected = selectedType === type.id;
          const label = type.translationKeys[selectedLanguage] || type.translationKeys.en;
          const IconComponent = type.Icon;

          return (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`group flex flex-col items-center justify-center gap-2 rounded-xl p-4 text-center transition-all duration-200 border min-h-[44px] ${
                isSelected
                  ? "bg-emerald-950 border-emerald-400 text-white shadow-lg"
                  : "bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-emerald-500 hover:text-white"
              }`}
            >
              <IconComponent className={`h-6 w-6 transition-transform duration-200 group-hover:scale-110 ${isSelected ? 'text-white' : 'text-emerald-400'}`} />
              <span className="text-sm font-semibold">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Dropdown and Submit panel */}
      {selectedType && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-xl border border-gray-700 bg-gray-800/40 p-4"
        >
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {t.selectZonePrompt}
            </label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none min-h-[44px]"
            >
              <option value="" disabled>
                {t.chooseZonePlaceholder}
              </option>
              {stadiumZones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.name}
                </option>
              ))}
            </select>
          </div>

          {/* Missing API Key Warning Block inside submit panel if configured incorrectly */}
          {!isApiKeyConfigured && (
            <div className="flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-400">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>Add your Gemini API key to .env to enable AI features. Simulated responses will be used.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!selectedZone || isLoading}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-black transition-all min-h-[44px] ${
              selectedZone && !isLoading
                ? "bg-emerald-500 hover:bg-emerald-400 cursor-pointer"
                : "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
            }`}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>{isLoading ? "Analyzing..." : t.submitBtn}</span>
          </button>
        </form>
      )}

      {/* Recent Intelligence Feed */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-800 bg-gray-950 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              {t.recentFeedTitle}
            </h3>
          </div>
          {selectedZoneFilter && (
            <button
              onClick={() => setSelectedZoneFilter(null)}
              className="text-[10px] font-bold text-sky-400 hover:underline cursor-pointer"
            >
              {t.clearFilter}
            </button>
          )}
        </div>

        {recentReports.length === 0 ? (
          <p className="py-2 text-center text-xs text-gray-500">{t.noReports}</p>
        ) : (
          <div className="flex flex-col gap-2">
            {recentReports.map((report) => {
              const zoneObj = stadiumZones.find((z) => z.id === report.zone);
              const typeObj = reportTypes.find((t) => t.id === report.type);
              const typeLabel = typeObj
                ? typeObj.translationKeys[selectedLanguage] || typeObj.translationKeys.en
                : report.type;

              const Icon = typeObj?.Icon || Compass;
              const isPending = report.status === "pending";
              const severityColor = getSeverityColor(report.severity);

              return (
                <div
                  key={report.id}
                  className="flex items-center justify-between rounded-lg border border-gray-800/80 bg-gray-900/60 p-3 transition-colors hover:bg-gray-900/80"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4.5 w-4.5 shrink-0 ${severityColor}`} />
                    <div>
                      <div className="text-sm font-medium text-white">{typeLabel}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">
                        {zoneObj?.name || report.zone}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider border ${
                        isPending
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      }`}
                    >
                      {isPending ? t.pending : t.resolved}
                    </span>
                    <span className="text-[9px] text-gray-500">
                      {formatTimeAgo(report.timestamp)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import stadiumZones from "../data/stadiumZones";

// Translations dictionary
const translations = {
  en: {
    reportTitle: "Report a Condition",
    selectZonePrompt: "Where is this happening?",
    chooseZonePlaceholder: "Select a Stadium Zone...",
    submitBtn: "Submit Report",
    recentFeedTitle: "Recent Live Intelligence",
    noReports: "No reports filed yet.",
    filteringZone: "Filtering by",
    clearFilter: "Clear Filter",
    justNow: "just now",
    minAgo: "m ago",
    hrAgo: "h ago",
    pending: "Pending",
    resolved: "Resolved",
    selectCategory: "Select a condition above to begin report",
    statusText: "Status",
    zoneLabel: "Zone",
    timeLabel: "Reported"
  },
  hi: {
    reportTitle: "स्थिति की रिपोर्ट करें",
    selectZonePrompt: "यह कहाँ हो रहा है?",
    chooseZonePlaceholder: "स्टेडियम क्षेत्र चुनें...",
    submitBtn: "रिपोर्ट जमा करें",
    recentFeedTitle: "हालिया लाइव इंटेलिजेंस",
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
    recentFeedTitle: "Inteligencia Reciente en Vivo",
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
    recentFeedTitle: "معلومات الاستخبارات الحية الأخيرة",
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
    recentFeedTitle: "अभी-अभी के लाइव खबर",
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

// Report category mappings with emojis and localized text
const reportTypes = [
  { id: "Crowded Gate", emoji: "🚪", translationKeys: { en: "Crowded Gate", hi: "भीड़भाड़ वाला गेट", es: "Puerta Abarrotada", ar: "بوابة مزدحمة", cg: "भीड़भाड़ वाला फाटक" } },
  { id: "Blocked Ramp", emoji: "♿", translationKeys: { en: "Blocked Ramp", hi: "अवरुद्ध रैंप", es: "Rampa Bloqueada", ar: "منحدر مغلق", cg: "घेरायल रैंप" } },
  { id: "Full Bin", emoji: "🗑️", translationKeys: { en: "Full Bin", hi: "भरा हुआ कचरा डिब्बा", es: "Contenedor Lleno", ar: "سلة مهملات ممتلئة", cg: "कचरा पेटी भरगे" } },
  { id: "Shuttle Delay", emoji: "🚌", translationKeys: { en: "Shuttle Delay", hi: "शटल सेवा में देरी", es: "Retraso de Bus", ar: "تأخر الحافلة", cg: "शटल गाड़ी देरी" } },
  { id: "Food Line", emoji: "🍔", translationKeys: { en: "Food Line", hi: "भोजन की लंबी कतार", es: "Fila de Comida", ar: "طابور الطعام", cg: "खाए के लाइन" } },
  { id: "Security Queue", emoji: "🔒", translationKeys: { en: "Security Queue", hi: "सुरक्षा जांच कतार", es: "Fila de Seguridad", ar: "طابور الأمن", cg: "सुरक्षा जांच लाइन" } },
  { id: "Water Station", emoji: "💧", translationKeys: { en: "Water Station", hi: "पेयजल केंद्र", es: "Estación de Agua", ar: "محطة مياه", cg: "पानी टंकी" } },
  { id: "Lost Person", emoji: "🆘", translationKeys: { en: "Lost Person", hi: "खोया हुआ व्यक्ति", es: "Persona Perdida", ar: "شخص مفقود", cg: "हराय गे मनखे" } }
];

export default function ReportPanel({
  reports,
  addReport,
  selectedLanguage,
  setSelectedLanguage,
  selectedZoneFilter,
  setSelectedZoneFilter
}) {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedZone, setSelectedZone] = useState("");

  const t = translations[selectedLanguage] || translations.en;
  const isRtl = selectedLanguage === "ar";

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedType || !selectedZone) return;

    // Call add report logic
    addReport({
      type: selectedType,
      zone: selectedZone,
      language: selectedLanguage
    });

    // Clear form
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

  return (
    <div
      style={{ direction: isRtl ? "rtl" : "ltr" }}
      className="flex flex-col gap-6 w-full text-white"
    >
      {/* Top Section with Language Selector */}
      <div className="flex flex-col justify-between items-start gap-4 border-b border-gray-800 pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight">{t.reportTitle}</h2>
          <p className="text-xs text-gray-400">
            {selectedZoneFilter
              ? `${t.filteringZone}: ${stadiumZones.find((z) => z.id === selectedZoneFilter)?.name}`
              : t.selectCategory}
          </p>
        </div>

        {/* Language selector */}
        <div className="flex flex-wrap gap-1.5 self-end sm:self-auto">
          {[
            { code: "en", label: "EN • English" },
            { code: "hi", label: "HI • हिन्दी" },
            { code: "es", label: "ES • Español" },
            { code: "ar", label: "AR • العربية" },
            { code: "cg", label: "CG • छत्तीसगढ़ी" }
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all border ${
                selectedLanguage === lang.code
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                  : "bg-gray-900 text-gray-400 border-gray-800 hover:text-white"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 8 Tap Buttons */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {reportTypes.map((type) => {
          const isSelected = selectedType === type.id;
          const label = type.translationKeys[selectedLanguage] || type.translationKeys.en;
          return (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`group flex flex-col items-center justify-center gap-2 rounded-xl p-4 text-center transition-all duration-300 border ${
                isSelected
                  ? "bg-emerald-500/10 border-emerald-400 text-emerald-400 shadow-md shadow-emerald-500/5 scale-102"
                  : "bg-gray-900/60 border-gray-800 hover:bg-gray-800/40 hover:border-gray-700"
              }`}
            >
              <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                {type.emoji}
              </span>
              <span className="text-xs font-bold leading-tight">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Dropdown and Submit panel */}
      {selectedType && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/40 p-4 animate-fadeIn"
        >
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {t.selectZonePrompt}
            </label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
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

          <button
            type="submit"
            disabled={!selectedZone}
            className={`w-full rounded-lg py-3 text-sm font-bold text-gray-950 transition-all duration-300 ${
              selectedZone
                ? "bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-emerald-500/10 cursor-pointer"
                : "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
            }`}
          >
            {t.submitBtn}
          </button>
        </form>
      )}

      {/* Recent Intelligence Feed */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-800 bg-gray-900/20 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            📢 {t.recentFeedTitle}
          </h3>
          {selectedZoneFilter && (
            <button
              onClick={() => setSelectedZoneFilter(null)}
              className="text-[10px] font-bold text-sky-400 hover:underline"
            >
              {t.clearFilter}
            </button>
          )}
        </div>

        {recentReports.length === 0 ? (
          <p className="py-4 text-center text-xs text-gray-500">{t.noReports}</p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {recentReports.map((report) => {
              const zoneObj = stadiumZones.find((z) => z.id === report.zone);
              const typeObj = reportTypes.find((t) => t.id === report.type);
              const typeLabel = typeObj
                ? typeObj.translationKeys[selectedLanguage] || typeObj.translationKeys.en
                : report.type;

              const isPending = report.status === "pending";

              return (
                <div
                  key={report.id}
                  className="flex items-center justify-between rounded-lg border border-gray-800/80 bg-gray-950/40 p-3 transition-colors hover:bg-gray-950/60"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {typeObj?.emoji || "🔔"}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white">{typeLabel}</div>
                      <div className="mt-0.5 text-[10px] text-gray-400">
                        {t.zoneLabel}: <span className="text-gray-300 font-semibold">{zoneObj?.name || report.zone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
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

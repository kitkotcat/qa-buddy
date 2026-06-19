import { useLanguage } from "../i18n/LanguageContext";

type LanguageToggleProps = {
  compact?: boolean;
  showLabel?: boolean;
};

function LanguageToggle({
  compact = false,
  showLabel = false,
}: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage();

  const currentLanguage =
    language === "ru" ? "Русский" : "English";

  const shortLanguage =
    language === "ru" ? "RU" : "EN";

  const switchLabel =
    language === "ru"
      ? "Переключить на английский"
      : "Switch to Russian";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-cyan-400 font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950 ${
        compact
          ? "h-11 min-w-14 px-3 text-sm"
          : "px-4 py-3 text-sm"
      }`}
      aria-label={switchLabel}
      title={switchLabel}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c2.5 2.6 4 5.8 4 9s-1.5 6.4-4 9" />
        <path d="M12 3c-2.5 2.6-4 5.8-4 9s1.5 6.4 4 9" />
      </svg>

      <span>
        {showLabel ? currentLanguage : shortLanguage}
      </span>
    </button>
  );
}

export default LanguageToggle;

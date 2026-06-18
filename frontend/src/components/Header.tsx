import { NavLink } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

function Header() {
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    { to: "/", label: t("nav.home") },
    { to: "/bug-reports", label: t("nav.bugReports") },
    { to: "/test-cases", label: t("nav.testCases") },
    { to: "/checklists", label: t("nav.checklists") },
    { to: "/interview", label: t("nav.interview") },
    { to: "/about", label: t("nav.about") },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <NavLink to="/" className="text-2xl font-black tracking-tight">
          <span className="text-white">QA</span>{" "}
          <span className="text-cyan-400">Buddy</span>
        </NavLink>

        <nav className="flex flex-wrap items-center justify-end gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-cyan-400 text-slate-950"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-xl border border-cyan-400 px-4 py-2 text-sm font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
            aria-label={t("language.label")}
          >
            {language === "en" ? "RU" : "EN"}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;

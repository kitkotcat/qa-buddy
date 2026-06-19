import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: t("nav.home") },
    { to: "/bug-reports", label: t("nav.bugReports") },
    { to: "/test-cases", label: t("nav.testCases") },
    { to: "/checklists", label: t("nav.checklists") },
    { to: "/interview", label: t("nav.interview") },
    { to: "/about", label: t("nav.about") },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const getNavLinkClass = (isActive: boolean) =>
    `rounded-xl px-4 py-3 text-sm font-semibold transition ${
      isActive
        ? "bg-cyan-400 text-slate-950"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <NavLink
            to="/"
            className="shrink-0 text-xl font-black tracking-tight sm:text-2xl"
          >
            <span className="text-white">QA</span>{" "}
            <span className="text-cyan-400">Buddy</span>
          </NavLink>

          <nav className="hidden flex-wrap items-center justify-end gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                {item.label}
              </NavLink>
            ))}

            <button
              type="button"
              onClick={toggleLanguage}
              className="rounded-xl border border-cyan-400 px-4 py-3 text-sm font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
              aria-label={t("language.label")}
            >
              {language === "en" ? "RU" : "EN"}
            </button>
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300 md:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 6L18 18" />
                <path d="M18 6L6 18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M4 7H20" />
                <path d="M4 12H20" />
                <path d="M4 17H20" />
              </svg>
            )}
          </button>
        </div>

        {isMenuOpen && (
          <nav
            id="mobile-navigation"
            className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-800 pt-3 md:hidden"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                {item.label}
              </NavLink>
            ))}

            <button
              type="button"
              onClick={toggleLanguage}
              className="col-span-2 rounded-xl border border-cyan-400 px-4 py-3 text-sm font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
              aria-label={t("language.label")}
            >
              {language === "en" ? "Русский" : "English"}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;

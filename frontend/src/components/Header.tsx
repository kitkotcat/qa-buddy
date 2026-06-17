import { NavLink } from "react-router-dom";

const navItems = [
  { title: "Home", path: "/" },
  { title: "Bug Reports", path: "/bug-report-generator" },
  { title: "Test Cases", path: "/test-case-generator" },
  { title: "Checklists", path: "/checklist-library" },
  { title: "Interview", path: "/interview-trainer" },
  { title: "About", path: "/about" },
];

function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <NavLink to="/" className="text-2xl font-bold tracking-tight">
          QA <span className="text-cyan-400">Buddy</span>
        </NavLink>

        <nav className="flex flex-wrap gap-3 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 transition ${
                  isActive
                    ? "bg-cyan-400 text-slate-950"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;

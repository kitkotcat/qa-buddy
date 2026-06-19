function QAThemeBackground() {
  return (
    <svg
      viewBox="0 0 900 420"
      className="pointer-events-none absolute inset-0 h-full w-full text-cyan-400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="qa-background-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.14" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="760" cy="40" r="210" fill="url(#qa-background-glow)" />
      <circle cx="80" cy="390" r="170" fill="url(#qa-background-glow)" />

      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.13"
      >
        <path d="M676 112l17 17 34-39" />
        <rect x="650" y="72" width="98" height="98" rx="24" />

        <path d="M120 102c-14-17-40-4-34 16 5 18 34 35 34 35s29-17 34-35c6-20-20-33-34-16z" />

        <path d="M760 300c20-26 64-20 76 10 13 34-20 64-58 64-39 0-70-30-58-64 8-20 23-28 40-10z" />

        <circle cx="738" cy="276" r="12" />
        <circle cx="770" cy="266" r="12" />
        <circle cx="802" cy="276" r="12" />
        <circle cx="822" cy="301" r="12" />

        <path d="M250 292h74" />
        <path d="M287 255v74" />
        <circle cx="287" cy="292" r="56" />

        <path d="M430 88l18-18 18 18 20-10 10 20-18 18 18 18-10 20-20-10-18 18-18-18-20 10-10-20 18-18-18-18 10-20z" />
        <circle cx="448" cy="116" r="16" />
      </g>
    </svg>
  );
}

export default QAThemeBackground;

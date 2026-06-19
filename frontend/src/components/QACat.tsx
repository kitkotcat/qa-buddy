export type QACatMood =
  | "idle"
  | "thinking"
  | "happy"
  | "sad"
  | "trophy";

type QACatProps = {
  mood?: QACatMood;
  message: string;
};

function QACatIllustration({ mood }: { mood: QACatMood }) {
  const isSad = mood === "sad";
  const isHappy = mood === "happy" || mood === "trophy";

  return (
    <svg
      viewBox="0 0 120 120"
      className="h-20 w-20"
      role="img"
      aria-label="QA Cat"
    >
      <circle
        cx="60"
        cy="60"
        r="55"
        fill="#020617"
        stroke="#22d3ee"
        strokeWidth="3"
      />

      <path
        d="M30 45L35 18L53 36"
        fill="#0f172a"
        stroke="#22d3ee"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <path
        d="M90 45L85 18L67 36"
        fill="#0f172a"
        stroke="#22d3ee"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <path
        d="M30 46C35 30 85 30 90 46V72C90 92 77 103 60 103C43 103 30 92 30 72V46Z"
        fill="#0f172a"
        stroke="#22d3ee"
        strokeWidth="3"
      />

      <circle cx="46" cy="59" r="5" fill="#f8fafc" />
      <circle cx="74" cy="59" r="5" fill="#f8fafc" />

      <circle cx="47" cy="60" r="2" fill="#020617" />
      <circle cx="73" cy="60" r="2" fill="#020617" />

      <path
        d="M55 70L60 74L65 70"
        fill="#22d3ee"
        stroke="#22d3ee"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {isSad ? (
        <path
          d="M50 88C55 80 65 80 70 88"
          fill="none"
          stroke="#f87171"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ) : isHappy ? (
        <path
          d="M48 82C55 92 65 92 72 82"
          fill="none"
          stroke="#34d399"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M52 85H68"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}

      <path d="M31 71L13 66" stroke="#94a3b8" strokeWidth="2" />
      <path d="M31 78L11 80" stroke="#94a3b8" strokeWidth="2" />
      <path d="M89 71L107 66" stroke="#94a3b8" strokeWidth="2" />
      <path d="M89 78L109 80" stroke="#94a3b8" strokeWidth="2" />

      {mood === "thinking" && (
        <>
          <circle cx="98" cy="25" r="15" fill="#22d3ee" />
          <text
            x="98"
            y="31"
            textAnchor="middle"
            fontSize="20"
            fontWeight="800"
            fill="#020617"
          >
            ?
          </text>
        </>
      )}

      {mood === "happy" && (
        <>
          <circle cx="98" cy="25" r="15" fill="#34d399" />
          <path
            d="M91 25L96 30L105 20"
            fill="none"
            stroke="#020617"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}

      {mood === "sad" && (
        <>
          <circle cx="98" cy="25" r="15" fill="#fb7185" />
          <path
            d="M93 20L103 30M103 20L93 30"
            stroke="#020617"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )}

      {mood === "trophy" && (
        <>
          <circle cx="98" cy="25" r="16" fill="#facc15" />
          <path
            d="M98 15L101 21L108 22L103 27L104 34L98 31L92 34L93 27L88 22L95 21Z"
            fill="#020617"
          />
        </>
      )}
    </svg>
  );
}

function QACat({
  mood = "idle",
  message,
}: QACatProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-4">
      <div className="shrink-0" aria-hidden="true">
        <QACatIllustration mood={mood} />
      </div>

      <p className="leading-7 text-slate-200">{message}</p>
    </div>
  );
}

export default QACat;

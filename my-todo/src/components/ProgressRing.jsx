import { useTheme } from "../context/ThemeContext";

export default function ProgressRing({ done, total }) {
  const { theme } = useTheme();
  const pct    = total === 0 ? 0 : done / total;
  const r      = 28;
  const circ   = 2 * Math.PI * r;
  const offset = circ * (1 - pct);

  return (
    <svg width={70} height={70} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={35} cy={35} r={r} fill="none"
        stroke={theme.divider} strokeWidth={5} />
      <circle cx={35} cy={35} r={r} fill="none"
        stroke="url(#ring-grad)" strokeWidth={5}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s ease" }} />
      <defs>
        <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <text x={35} y={39} textAnchor="middle"
        fill={theme.text} fontSize={13} fontWeight={700}
        style={{ transform: "rotate(90deg)", transformOrigin: "35px 35px" }}>
        {total === 0 ? "—" : `${Math.round(pct * 100)}%`}
      </text>
    </svg>
  );
}

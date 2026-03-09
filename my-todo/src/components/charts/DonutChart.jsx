import { useTheme } from "../../context/ThemeContext";
import "./DonutChart.css";

export default function DonutChart({ data, title, subtitle }) {
  const { theme } = useTheme();

  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 52;
  const cx = 70;
  const cy = 70;
  const circumference = 2 * Math.PI * r;

  // Build segments
  let offset = 0;
  const segments = data.map(d => {
    const pct   = total === 0 ? 0 : d.value / total;
    const dash  = pct * circumference;
    const gap   = circumference - dash;
    const seg   = { ...d, pct, dash, gap, offset };
    offset += dash;
    return seg;
  });

  return (
    <div
      className="donut-card"
      style={{ background: theme.surface, border: `1px solid ${theme.border}`, boxShadow: theme.shadow }}
    >
      <div className="donut-card__header">
        <p className="donut-card__title"   style={{ color: theme.text }}>{title}</p>
        <p className="donut-card__subtitle" style={{ color: theme.textMuted }}>{subtitle}</p>
      </div>

      <div className="donut-card__body">
        {/* SVG donut */}
        <div className="donut-card__svg-wrap">
          <svg width={140} height={140} viewBox="0 0 140 140">
            {/* bg track */}
            <circle
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={theme.divider}
              strokeWidth={14}
            />
            {segments.map((seg, i) => (
              <circle
                key={i}
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth={14}
                strokeDasharray={`${seg.dash} ${seg.gap}`}
                strokeDashoffset={-seg.offset + circumference / 4}
                strokeLinecap="butt"
                style={{ transition: "stroke-dasharray 0.5s ease" }}
              />
            ))}
            {/* centre label */}
            <text x={cx} y={cy - 8}  textAnchor="middle" fill={theme.text}
              fontSize={22} fontWeight={800}>
              {total}
            </text>
            <text x={cx} y={cy + 10} textAnchor="middle" fill={theme.textMuted}
              fontSize={10} fontWeight={500}>
              TOTAL
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="donut-card__legend">
          {segments.map((seg, i) => (
            <div key={i} className="donut-legend-item">
              <span className="donut-legend-dot" style={{ background: seg.color }} />
              <div className="donut-legend-text">
                <span className="donut-legend-label" style={{ color: theme.text }}>
                  {seg.label}
                </span>
                <span className="donut-legend-value" style={{ color: theme.textMuted }}>
                  {seg.value} &nbsp;
                  <span style={{ color: seg.color, fontWeight: 700 }}>
                    {total === 0 ? "0" : Math.round(seg.value / total * 100)}%
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

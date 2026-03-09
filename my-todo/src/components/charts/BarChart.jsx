import { useTheme } from "../../context/ThemeContext";
import "./BarChart.css";

export default function BarChart({ data, title, subtitle, valueLabel = "" }) {
  const { theme } = useTheme();
  const max = Math.max(...data.map(d => d.value), 1);

  return (
    <div
      className="bar-chart-card"
      style={{ background: theme.surface, border: `1px solid ${theme.border}`, boxShadow: theme.shadow }}
    >
      <div className="bar-chart-card__header">
        <p className="bar-chart-card__title"    style={{ color: theme.text }}>{title}</p>
        <p className="bar-chart-card__subtitle" style={{ color: theme.textMuted }}>{subtitle}</p>
      </div>

      <div className="bar-chart__bars">
        {data.map((d, i) => {
          const pct = (d.value / max) * 100;
          return (
            <div key={i} className="bar-chart__row">
              <div className="bar-chart__emoji">{d.emoji}</div>
              <div className="bar-chart__track" style={{ background: theme.divider }}>
                <div
                  className="bar-chart__fill"
                  style={{
                    width:      `${pct}%`,
                    background: d.color,
                    boxShadow:  `0 0 8px ${d.color}55`,
                  }}
                />
              </div>
              <div className="bar-chart__meta">
                <span className="bar-chart__label" style={{ color: theme.text }}>
                  {d.label}
                </span>
                <span className="bar-chart__value" style={{ color: d.color }}>
                  {d.value}{valueLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

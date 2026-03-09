import { useTheme } from "../../context/ThemeContext";
import { TIME_OPTIONS, TIME_COLORS } from "../../constants";
import { TIME_MINS } from "../../utils";
import "./TimeChart.css";

export default function TimeChart({ todos }) {
  const { theme } = useTheme();

  const active = todos.filter(t => !t.done && t.timeEstimate);

  // group by time estimate
  const counts = TIME_OPTIONS.map(opt => ({
    label: opt,
    color: TIME_COLORS[opt],
    count: active.filter(t => t.timeEstimate === opt).length,
    mins:  active.filter(t => t.timeEstimate === opt).length * (TIME_MINS[opt] || 0),
  }));

  const totalMins = counts.reduce((s, c) => s + c.mins, 0);
  const totalH    = totalMins >= 60
    ? `${Math.floor(totalMins / 60)}h ${totalMins % 60 > 0 ? (totalMins % 60) + "m" : ""}`
    : `${totalMins}m`;

  return (
    <div
      className="time-chart-card"
      style={{ background: theme.surface, border: `1px solid ${theme.border}`, boxShadow: theme.shadow }}
    >
      <div className="time-chart-card__header">
        <div>
          <p className="time-chart-card__title"    style={{ color: theme.text }}>⏱ Time Required</p>
          <p className="time-chart-card__subtitle" style={{ color: theme.textMuted }}>
            Estimated workload for active tasks
          </p>
        </div>
        <div className="time-chart-card__total">
          <span className="time-chart-card__total-val" style={{ color: theme.accent }}>
            {totalMins === 0 ? "—" : totalH}
          </span>
          <span className="time-chart-card__total-label" style={{ color: theme.textMuted }}>
            total
          </span>
        </div>
      </div>

      {/* stacked bar */}
      {totalMins > 0 && (
        <div className="time-chart__stack" style={{ background: theme.divider }}>
          {counts.filter(c => c.mins > 0).map((c, i) => (
            <div
              key={i}
              className="time-chart__segment"
              style={{
                width:      `${(c.mins / totalMins) * 100}%`,
                background: c.color,
              }}
              title={`${c.label}: ${c.count} task${c.count !== 1 ? "s" : ""}`}
            />
          ))}
        </div>
      )}

      {/* breakdown */}
      <div className="time-chart__breakdown">
        {counts.filter(c => c.count > 0).map((c, i) => (
          <div key={i} className="time-chart__item">
            <span className="time-chart__dot" style={{ background: c.color }} />
            <span className="time-chart__item-label" style={{ color: theme.textSub }}>
              {c.label}
            </span>
            <span className="time-chart__item-count" style={{ color: c.color }}>
              {c.count}×
            </span>
          </div>
        ))}
        {active.length === 0 && (
          <p style={{ fontSize: 12, color: theme.textMuted, fontStyle: "italic" }}>
            No active tasks with time estimates
          </p>
        )}
      </div>
    </div>
  );
}

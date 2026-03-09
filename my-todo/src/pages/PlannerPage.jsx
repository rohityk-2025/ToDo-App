import { useTheme }  from "../context/ThemeContext";
import { useTodos }  from "../context/TodoContext";
import Quadrant      from "../components/Quadrant";
import BarChart      from "../components/charts/BarChart";
import Calendar      from "../components/charts/Calendar";
import { useTheme as useThemeHook } from "../context/ThemeContext";
import { QUADRANTS, CAT_COLORS, TIME_COLORS } from "../constants";
import { getWeekOf, truncate, TIME_MINS, minsToLabel } from "../utils";
import "./PlannerPage.css";

export default function PlannerPage() {
  const { theme }  = useTheme();
  const { todos, quadrantMap, dropIntoQuadrant, removeFromMatrix, toggleTodo } = useTodos();

  const unplanned  = todos.filter(t => !t.done && !quadrantMap[t.id]);
  const matrixData = QUADRANTS.map(q => ({
    ...q,
    tasks: todos.filter(t => quadrantMap[t.id] === q.id),
  }));

  // Bar chart data — task count per quadrant
  const quadrantCountData = matrixData.map(q => ({
    label: `${q.label} · ${q.sub}`,
    emoji: q.emoji,
    value: q.tasks.length,
    color: q.color,
  }));

  // Bar chart data — time per quadrant (in hours)
  const quadrantTimeData = matrixData.map(q => {
    const mins = q.tasks.reduce((acc, t) => acc + (TIME_MINS[t.timeEstimate] || 0), 0);
    return {
      label: `${q.label} · ${q.sub}`,
      emoji: q.emoji,
      value: parseFloat((mins / 60).toFixed(1)),
      color: q.color,
    };
  });

  const totalPlanned   = todos.filter(t => quadrantMap[t.id]).length;
  const totalCompleted = todos.filter(t => t.done).length;
  const totalMinsAll   = matrixData.reduce((acc, q) =>
    acc + q.tasks.reduce((a, t) => a + (TIME_MINS[t.timeEstimate] || 0), 0), 0);

  const stats = [
    { label: "Planned",   value: totalPlanned,   color: "#6366f1", emoji: "🗓️" },
    { label: "Unplanned", value: unplanned.length, color: "#f59e0b", emoji: "📋" },
    { label: "Completed", value: totalCompleted,  color: "#10b981", emoji: "✅" },
    { label: "Total Time",value: totalMinsAll === 0 ? "—" : minsToLabel(totalMinsAll), color: "#3b82f6", emoji: "⏱" },
  ];

  return (
    <div className="planner-page">

      {/* ── stat strip ── */}
      <div className="planner-page__stats">
        {stats.map((s, i) => (
          <div
            key={i}
            className="stat-card"
            style={{ background: theme.surface, border: `1px solid ${theme.border}`, boxShadow: theme.shadow }}
          >
            <span className="stat-card__emoji">{s.emoji}</span>
            <span className="stat-card__value" style={{ color: s.color }}>{s.value}</span>
            <span className="stat-card__label" style={{ color: theme.textMuted }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="planner-page__body">

        {/* ── LEFT: matrix + unplanned dock ── */}
        <div className="planner-page__left">
          <div className="planner-section-header">
            <p className="planner-eyebrow" style={{ color: theme.accent }}>
              WEEK OF {getWeekOf()}
            </p>
            <h2 className="planner-title" style={{ color: theme.text }}>Week Planner</h2>
            <p className="planner-sub" style={{ color: theme.textMuted }}>
              Drag tasks into the priority matrix.
              {unplanned.length > 0 && (
                <span style={{ color: "#f59e0b", fontWeight: 600 }}>
                  {" "}{unplanned.length} unplanned task{unplanned.length !== 1 ? "s" : ""}.
                </span>
              )}
            </p>
          </div>

          {/* unplanned dock */}
          {unplanned.length > 0 && (
            <div
              className="planner-dock"
              style={{ background: theme.surface, border: `1px solid ${theme.border}`, boxShadow: theme.shadow }}
            >
              <p className="planner-dock__label" style={{ color: theme.textMuted }}>
                📋 Unplanned — drag into a quadrant
              </p>
              <div className="planner-dock__chips">
                {unplanned.map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={e => e.dataTransfer.setData("taskId", task.id)}
                    className="planner-dock__chip"
                    style={{ background: theme.pillBg, border: `1px solid ${theme.border}`, color: theme.text }}
                    onMouseEnter={e => e.currentTarget.style.background = theme.surfaceHover}
                    onMouseLeave={e => e.currentTarget.style.background = theme.pillBg}
                  >
                    <span className="planner-dock__dot"
                      style={{ background: CAT_COLORS[task.category] || "#888" }} />
                    {truncate(task.text)}
                    {task.timeEstimate && (
                      <span style={{ fontSize: 9, color: TIME_COLORS[task.timeEstimate], fontWeight: 700 }}>
                        ⏱{task.timeEstimate}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2×2 matrix */}
          <div className="planner-matrix">
            {matrixData.map(q => (
              <Quadrant
                key={q.id}
                q={q}
                tasks={q.tasks}
                onDrop={dropIntoQuadrant}
                onRemove={removeFromMatrix}
                onToggle={toggleTodo}
              />
            ))}
          </div>

          {/* Matrix legend */}
          <div className="planner-legend">
            {QUADRANTS.map(q => (
              <div key={q.id} className="planner-legend__item" style={{ color: theme.textMuted }}>
                <span className="planner-legend__dot" style={{ background: q.color }} />
                {q.emoji} {q.label} · {q.sub}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: charts + calendar ── */}
        <div className="planner-page__right">
          <BarChart
            data={quadrantCountData}
            title="Tasks per Quadrant"
            subtitle="How many tasks are in each priority zone"
          />
          <BarChart
            data={quadrantTimeData}
            title="Time per Quadrant"
            subtitle="Estimated hours in each zone"
            valueLabel="h"
          />
          <Calendar todos={todos} />
        </div>

      </div>
    </div>
  );
}

import Quadrant from "./Quadrant";
import { useTheme } from "../context/ThemeContext";
import { useTodos } from "../context/TodoContext";
import { QUADRANTS, CAT_COLORS, TIME_COLORS } from "../constants";
import { getWeekOf, truncate } from "../utils";
import "./WeekPlanner.css";

export default function WeekPlanner() {
  const { theme } = useTheme();
  const { todos, quadrantMap, dropIntoQuadrant, removeFromMatrix, toggleTodo } = useTodos();

  const unplanned  = todos.filter(t => !t.done && !quadrantMap[t.id]);
  const matrixData = QUADRANTS.map(q => ({
    ...q,
    tasks: todos.filter(t => quadrantMap[t.id] === q.id),
  }));

  return (
    <div className="week-planner" style={{ borderTop: `1px solid ${theme.divider}` }}>
      {/* header */}
      <p className="week-planner__eyebrow" style={{ color: theme.accent }}>
        WEEK OF {getWeekOf()}
      </p>
      <h2 className="week-planner__title" style={{ color: theme.text }}>
        Week Planner
      </h2>
      <p className="week-planner__sub" style={{ color: theme.textMuted }}>
        Drag any task into the priority matrix below.
        {unplanned.length > 0 && (
          <span style={{ color: "#f59e0b", fontWeight: 600 }}>
            {" "}{unplanned.length} task{unplanned.length !== 1 ? "s" : ""} not yet planned.
          </span>
        )}
      </p>

      {/* unplanned dock */}
      {unplanned.length > 0 && (
        <div
          className="week-planner__dock"
          style={{ background: theme.surface, border: `1px solid ${theme.border}`, boxShadow: theme.shadow }}
        >
          <p className="week-planner__dock-label" style={{ color: theme.textMuted }}>
            📋 Unplanned — drag into a quadrant
          </p>
          <div className="week-planner__dock-items">
            {unplanned.map(task => (
              <div
                key={task.id}
                className="week-planner__dock-chip"
                draggable
                onDragStart={e => e.dataTransfer.setData("taskId", task.id)}
                style={{ background: theme.pillBg, border: `1px solid ${theme.border}`, color: theme.text }}
                onMouseEnter={e => e.currentTarget.style.background = theme.surfaceHover}
                onMouseLeave={e => e.currentTarget.style.background = theme.pillBg}
              >
                <span
                  className="week-planner__dock-dot"
                  style={{ background: CAT_COLORS[task.category] || "#888" }}
                />
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
      <div className="week-planner__grid">
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

      {/* legend */}
      <div className="week-planner__legend">
        {QUADRANTS.map(q => (
          <div key={q.id} className="week-planner__legend-item" style={{ color: theme.textMuted }}>
            <span className="week-planner__legend-dot" style={{ background: q.color }} />
            {q.emoji} {q.label} · {q.sub}
          </div>
        ))}
      </div>
    </div>
  );
}

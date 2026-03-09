import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { CAT_COLORS } from "../../constants";
import "./Calendar.css";

const DAYS   = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  // 0=Sun…6=Sat → convert to Mon-first (0=Mon)
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

export default function Calendar({ todos }) {
  const { theme } = useTheme();
  const now       = new Date();
  const [year,  setYear]  = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay    = getFirstDayOfMonth(year, month);

  // Map tasks to their creation date day number (same month/year)
  function tasksOnDay(day) {
    return todos.filter(t => {
      if (!t.createdDate) return false;
      const d = new Date(t.createdDate);
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
    });
  }

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDay(null);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDay(null);
  }

  const cells = [];
  // empty cells before first day
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const selectedTasks = selectedDay ? tasksOnDay(selectedDay) : [];
  const isToday = (day) =>
    day === now.getDate() && month === now.getMonth() && year === now.getFullYear();

  return (
    <div
      className="calendar-card"
      style={{ background: theme.surface, border: `1px solid ${theme.border}`, boxShadow: theme.shadow }}
    >
      {/* Header */}
      <div className="calendar__header">
        <button
          className="calendar__nav-btn"
          onClick={prevMonth}
          style={{ color: theme.textSub, background: theme.pillBg }}
        >‹</button>

        <span className="calendar__month-label" style={{ color: theme.text }}>
          {MONTHS[month]} {year}
        </span>

        <button
          className="calendar__nav-btn"
          onClick={nextMonth}
          style={{ color: theme.textSub, background: theme.pillBg }}
        >›</button>
      </div>

      {/* Day headers */}
      <div className="calendar__day-names">
        {DAYS.map(d => (
          <div key={d} className="calendar__day-name" style={{ color: theme.textMuted }}>
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="calendar__grid">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} className="calendar__cell calendar__cell--empty" />;
          const dayTasks   = tasksOnDay(day);
          const hasTask    = dayTasks.length > 0;
          const doneTasks  = dayTasks.filter(t => t.done).length;
          const isSelected = selectedDay === day;
          const today      = isToday(day);

          return (
            <button
              key={day}
              className={`calendar__cell ${today ? "calendar__cell--today" : ""} ${isSelected ? "calendar__cell--selected" : ""}`}
              onClick={() => setSelectedDay(isSelected ? null : day)}
              style={{
                color:      today ? "#fff" : theme.text,
                background: today
                  ? theme.accent
                  : isSelected
                    ? theme.surfaceHover
                    : "transparent",
                border: isSelected && !today
                  ? `1.5px solid ${theme.accent}`
                  : "1.5px solid transparent",
              }}
            >
              <span className="calendar__cell-day">{day}</span>
              {hasTask && (
                <div className="calendar__cell-dots">
                  {dayTasks.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="calendar__dot"
                      style={{
                        background: t.done ? "#10b981" : CAT_COLORS[t.category] || theme.accent,
                        opacity:    t.done ? 0.6 : 1,
                      }}
                    />
                  ))}
                  {dayTasks.length > 3 && (
                    <span className="calendar__dot-more" style={{ color: theme.textMuted }}>
                      +{dayTasks.length - 3}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected day tasks */}
      {selectedDay && (
        <div className="calendar__detail" style={{ borderTop: `1px solid ${theme.border}` }}>
          <p className="calendar__detail-title" style={{ color: theme.textSub }}>
            {MONTHS[month]} {selectedDay} — {selectedTasks.length} task{selectedTasks.length !== 1 ? "s" : ""}
          </p>
          {selectedTasks.length === 0 ? (
            <p className="calendar__detail-empty" style={{ color: theme.textMuted }}>
              No tasks added on this day
            </p>
          ) : (
            <div className="calendar__detail-list">
              {selectedTasks.map(t => (
                <div key={t.id} className="calendar__detail-item">
                  <span
                    className="calendar__detail-dot"
                    style={{ background: t.done ? "#10b981" : CAT_COLORS[t.category] || "#888" }}
                  />
                  <span
                    className="calendar__detail-text"
                    style={{
                      color:          t.done ? theme.textMuted : theme.text,
                      textDecoration: t.done ? "line-through" : "none",
                    }}
                  >
                    {t.text}
                  </span>
                  <span
                    className="calendar__detail-status"
                    style={{ color: t.done ? "#10b981" : "#f59e0b" }}
                  >
                    {t.done ? "✓ Done" : "● Active"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="calendar__legend" style={{ borderTop: `1px solid ${theme.border}` }}>
        <div className="calendar__legend-item">
          <span className="calendar__dot" style={{ background: theme.accent }} />
          <span style={{ color: theme.textMuted, fontSize: 11 }}>Active task added</span>
        </div>
        <div className="calendar__legend-item">
          <span className="calendar__dot" style={{ background: "#10b981", opacity: 0.6 }} />
          <span style={{ color: theme.textMuted, fontSize: 11 }}>Completed task</span>
        </div>
      </div>
    </div>
  );
}

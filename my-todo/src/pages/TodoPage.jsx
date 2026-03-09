import { useTheme } from "../context/ThemeContext";
import { useTodos }  from "../context/TodoContext";
import TodoInput  from "../components/TodoInput";
import TodoList   from "../components/TodoList";
import DonutChart from "../components/charts/DonutChart";
import TimeChart  from "../components/charts/TimeChart";
import { CAT_COLORS, CATEGORIES } from "../constants";
import "./TodoPage.css";

export default function TodoPage() {
  const { theme } = useTheme();
  const { todos } = useTodos();

  const active    = todos.filter(t => !t.done).length;
  const completed = todos.filter(t =>  t.done).length;
  const total     = todos.length;

  // Status donut data
  const statusData = [
    { label: "Active",    value: active,    color: "#3b82f6" },
    { label: "Completed", value: completed, color: "#10b981" },
  ];

  // Category donut data — only categories that have tasks
  const catData = CATEGORIES
    .map(cat => ({
      label: cat,
      value: todos.filter(t => t.category === cat).length,
      color: CAT_COLORS[cat],
    }))
    .filter(c => c.value > 0);

  // Stat cards
  const stats = [
    { label: "Total Tasks",    value: total,                  color: theme.accent,  emoji: "📋" },
    { label: "Active",         value: active,                 color: "#3b82f6",     emoji: "🔵" },
    { label: "Completed",      value: completed,              color: "#10b981",     emoji: "✅" },
    { label: "Completion Rate",value: total === 0 ? "—" : `${Math.round(completed/total*100)}%`,
      color: "#f59e0b", emoji: "📈" },
  ];

  return (
    <div className="todo-page">
      {/* ── Stat strip ── */}
      <div className="todo-page__stats">
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

      <div className="todo-page__body">
        {/* ── Left: input + list ── */}
        <div className="todo-page__left">
          <TodoInput />
          <TodoList  />
        </div>

        {/* ── Right: charts ── */}
        <div className="todo-page__right">
          <DonutChart
            data={statusData}
            title="Task Status"
            subtitle="Active vs completed breakdown"
          />
          <TimeChart todos={todos} />
          {catData.length > 0 && (
            <DonutChart
              data={catData}
              title="By Category"
              subtitle="Tasks across all categories"
            />
          )}
        </div>
      </div>
    </div>
  );
}

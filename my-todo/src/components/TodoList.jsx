import { useState } from "react";
import TodoItem from "./TodoItem";
import { useTheme } from "../context/ThemeContext";
import { useTodos } from "../context/TodoContext";
import { CATEGORIES, CAT_COLORS, FILTERS } from "../constants";
import { LIGHT } from "../constants/theme";
import "./TodoList.css";

export default function TodoList() {
  const { theme, LIGHT: L } = useTheme();
  const { todos, toggleTodo, deleteTodo, editTodo, clearCompleted } = useTodos();

  const [filter,    setFilter]    = useState("All");
  const [catFilter, setCatFilter] = useState("All");

  const filtered = todos.filter(t => {
    const mf = filter === "All"
      || (filter === "Active"    && !t.done)
      || (filter === "Completed" &&  t.done);
    const mc = catFilter === "All" || t.category === catFilter;
    return mf && mc;
  });

  const doneCount = todos.filter(t => t.done).length;

  return (
    <div className="todo-list">
      {/* ── filter bar ── */}
      <div className="todo-list__filters">
        <div className="todo-list__status-filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`todo-list__filter-btn ${filter === f ? "todo-list__filter-btn--active" : ""}`}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f
                  ? (theme === LIGHT ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)")
                  : "transparent",
                color: filter === f ? theme.text : theme.textMuted,
              }}
            >{f}</button>
          ))}
        </div>

        <div className="todo-list__cat-filters">
          <button
            className="todo-list__cat-all"
            onClick={() => setCatFilter("All")}
            style={{
              background: catFilter === "All"
                ? (theme === LIGHT ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.08)")
                : "transparent",
              color: catFilter === "All" ? theme.text : theme.textMuted,
            }}
          >All</button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              title={cat}
              className="todo-list__cat-dot"
              onClick={() => setCatFilter(p => p === cat ? "All" : cat)}
              style={{
                background: CAT_COLORS[cat],
                border: catFilter === cat
                  ? `2.5px solid ${CAT_COLORS[cat]}`
                  : "2px solid transparent",
                opacity: catFilter === cat ? 1 : 0.4,
                outline: catFilter === cat ? `2px solid ${CAT_COLORS[cat]}` : "none",
                outlineOffset: "1px",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── items ── */}
      <div className="todo-list__items">
        {filtered.length === 0 ? (
          <div className="todo-list__empty" style={{ color: theme.textMuted }}>
            <span className="todo-list__empty-emoji">
              {filter === "Completed" ? "🎉" : "✨"}
            </span>
            <span>
              {filter === "Completed"
                ? "Nothing completed yet — keep going!"
                : "All clear! Add a task above."}
            </span>
          </div>
        ) : (
          filtered.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))
        )}
      </div>

      {/* ── footer ── */}
      {todos.length > 0 && (
        <div className="todo-list__footer" style={{ color: theme.textMuted }}>
          <span>{todos.filter(t => !t.done).length} items left</span>
          {doneCount > 0 && (
            <button
              className="todo-list__clear-btn"
              onClick={clearCompleted}
              style={{ color: theme.textMuted }}
              onMouseEnter={e => e.target.style.color = "#ff6b6b"}
              onMouseLeave={e => e.target.style.color = theme.textMuted}
            >
              Clear completed ({doneCount})
            </button>
          )}
        </div>
      )}
    </div>
  );
}

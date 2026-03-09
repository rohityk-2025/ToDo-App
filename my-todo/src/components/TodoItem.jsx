import { useState, useRef, useEffect } from "react";
import Checkbox from "./Checkbox";
import { useTheme } from "../context/ThemeContext";
import { CAT_COLORS, TAG_COLORS, TIME_COLORS } from "../constants";
import "./TodoItem.css";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const { theme } = useTheme();
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  function commit() {
    const t = draft.trim();
    if (t) onEdit(todo.id, t);
    else setDraft(todo.text);
    setEditing(false);
  }

  return (
    <div
      className="todo-item"
      draggable
      onDragStart={e => e.dataTransfer.setData("taskId", todo.id)}
      style={{
        background:   todo.done ? theme.cardDone : theme.surface,
        border:       `1px solid ${theme.border}`,
        opacity:      todo.done ? 0.55 : 1,
        boxShadow:    theme.shadow,
      }}
      onMouseEnter={e => e.currentTarget.style.background = theme.surfaceHover}
      onMouseLeave={e => e.currentTarget.style.background = todo.done ? theme.cardDone : theme.surface}
    >
      <Checkbox checked={todo.done} onChange={() => onToggle(todo.id)} />

      {/* category dot */}
      <span className="todo-item__dot"
        style={{ background: CAT_COLORS[todo.category] || "#888" }} />

      {editing ? (
        <input
          ref={inputRef}
          className="todo-item__edit-input"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={e => {
            if (e.key === "Enter")  commit();
            if (e.key === "Escape") { setDraft(todo.text); setEditing(false); }
          }}
          style={{ background: theme.inputBg, border: `1px solid ${theme.inputBorder}`, color: theme.text }}
        />
      ) : (
        <span
          className="todo-item__text"
          onDoubleClick={() => setEditing(true)}
          title="Double-click to edit"
          style={{
            color:          todo.done ? theme.textMuted : theme.text,
            textDecoration: todo.done ? "line-through" : "none",
          }}
        >
          {todo.text}
        </span>
      )}

      {/* chips */}
      <div className="todo-item__chips">
        {(todo.tags || []).slice(0, 2).map(tag => (
          <span key={tag} className="chip"
            style={{ background: `${TAG_COLORS[tag]}22`, color: TAG_COLORS[tag] }}>
            {tag}
          </span>
        ))}
        {todo.timeEstimate && (
          <span className="chip"
            style={{ background: `${TIME_COLORS[todo.timeEstimate]}22`, color: TIME_COLORS[todo.timeEstimate] }}>
            ⏱ {todo.timeEstimate}
          </span>
        )}
        <span className="chip"
          style={{ background: `${CAT_COLORS[todo.category]}22`, color: CAT_COLORS[todo.category] }}>
          {todo.category}
        </span>
      </div>

      <button
        className="todo-item__delete"
        onClick={() => onDelete(todo.id)}
        style={{ color: theme.textMuted }}
        onMouseEnter={e => e.target.style.color = "#ff6b6b"}
        onMouseLeave={e => e.target.style.color = theme.textMuted}
      >×</button>
    </div>
  );
}

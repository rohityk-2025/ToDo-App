import Checkbox from "./Checkbox";
import { useTheme } from "../context/ThemeContext";
import { CAT_COLORS, TIME_COLORS } from "../constants";
import "./MatrixCard.css";

export default function MatrixCard({ todo, quadrant, onRemove, onToggle }) {
  const { theme } = useTheme();

  return (
    <div
      className="matrix-card"
      style={{
        background: theme.surface,
        border:     `1px solid ${quadrant.border}`,
        boxShadow:  theme.shadow,
      }}
    >
      <div className="matrix-card__top">
        <Checkbox checked={todo.done} onChange={() => onToggle(todo.id)} />
        <span
          className="matrix-card__text"
          style={{
            color:          todo.done ? theme.textMuted : theme.text,
            textDecoration: todo.done ? "line-through" : "none",
          }}
        >
          {todo.text}
        </span>
        <button
          className="matrix-card__remove"
          onClick={() => onRemove(todo.id)}
          style={{ color: theme.textMuted }}
          onMouseEnter={e => e.target.style.color = "#ff6b6b"}
          onMouseLeave={e => e.target.style.color = theme.textMuted}
        >×</button>
      </div>

      <div className="matrix-card__chips">
        <span className="chip"
          style={{ background: `${quadrant.color}22`, color: quadrant.color }}>
          {quadrant.emoji} {quadrant.label}
        </span>
        <span className="chip"
          style={{ background: theme.pillBg, color: theme.textSub }}>
          ⏱ {quadrant.sub}
        </span>
        {todo.timeEstimate && (
          <span className="chip"
            style={{ background: `${TIME_COLORS[todo.timeEstimate]}22`, color: TIME_COLORS[todo.timeEstimate] }}>
            {todo.timeEstimate}
          </span>
        )}
        {todo.category && (
          <span className="chip"
            style={{ background: `${CAT_COLORS[todo.category]}22`, color: CAT_COLORS[todo.category] }}>
            {todo.category}
          </span>
        )}
      </div>
    </div>
  );
}

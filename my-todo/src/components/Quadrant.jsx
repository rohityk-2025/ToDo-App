import { useState } from "react";
import MatrixCard from "./MatrixCard";
import { useTheme } from "../context/ThemeContext";
import { minsToLabel, TIME_MINS } from "../utils";
import "./Quadrant.css";

export default function Quadrant({ q, tasks, onDrop, onRemove, onToggle }) {
  const { theme } = useTheme();
  const [over, setOver] = useState(false);

  const totalMins  = tasks.reduce((acc, t) => acc + (TIME_MINS[t.timeEstimate] || 0), 0);
  const timeLabel  = minsToLabel(totalMins);
  const overloaded = q.id === "q1" && tasks.length > 3;

  return (
    <div
      className="quadrant"
      style={{
        background: over ? q.bg.replace("0.07", "0.15") : q.bg,
        border:     `1.5px dashed ${over ? q.color : q.border}`,
      }}
      onDragOver={e  => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={e => {
        e.preventDefault();
        setOver(false);
        const id = e.dataTransfer.getData("taskId");
        if (id) onDrop(id, q.id);
      }}
    >
      {/* header */}
      <div className="quadrant__header">
        <div>
          <div className="quadrant__emoji">{q.emoji}</div>
          <div className="quadrant__label" style={{ color: q.color }}>{q.label}</div>
          <div className="quadrant__sub"   style={{ color: theme.textSub }}>{q.sub}</div>
        </div>

        <div className="quadrant__meta">
          <span className="quadrant__count"
            style={{ background: theme.pillBg, color: theme.textSub }}>
            {tasks.length} task{tasks.length !== 1 ? "s" : ""}
          </span>
          {timeLabel && (
            <span className="quadrant__time"
              style={{ background: `${q.color}22`, color: q.color }}>
              ~{timeLabel} total
            </span>
          )}
          {overloaded && (
            <span className="quadrant__warn">⚠ Overloaded</span>
          )}
        </div>
      </div>

      {tasks.length === 0 && (
        <div className="quadrant__empty" style={{ color: theme.textMuted }}>
          Drop tasks here
        </div>
      )}

      {tasks.map(task => (
        <MatrixCard
          key={task.id}
          todo={task}
          quadrant={q}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

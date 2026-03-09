import { useState, useRef } from "react";
import Pill from "./Pill";
import { useTheme } from "../context/ThemeContext";
import { useTodos } from "../context/TodoContext";
import { CATEGORIES, CAT_COLORS, TAGS, TAG_COLORS, TIME_OPTIONS, TIME_COLORS } from "../constants";
import "./TodoInput.css";

export default function TodoInput() {
  const { theme }  = useTheme();
  const { addTodo } = useTodos();

  const [input,         setInput]         = useState("");
  const [category,      setCategory]      = useState("Personal");
  const [selTags,       setSelTags]       = useState([]);
  const [timeEst,       setTimeEst]       = useState("");
  const [showTagPicker, setShowTagPicker] = useState(false);
  const inputRef = useRef(null);

  function toggleTag(tag) {
    setSelTags(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag]);
  }

  async function handleAdd() {
    const text = input.trim();
    if (!text) return;
    await addTodo({ text, category, tags: selTags, timeEstimate: timeEst });
    setInput("");
    setSelTags([]);
    setTimeEst("");
    inputRef.current?.focus();
  }

  return (
    <div
      className="todo-input"
      style={{
        background: theme.surface,
        border:     `1px solid ${theme.border}`,
        boxShadow:  theme.shadow,
      }}
    >
      {/* text row */}
      <div className="todo-input__row">
        <input
          ref={inputRef}
          className="todo-input__field"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleAdd()}
          placeholder="What needs to be done?"
          style={{
            background:  theme.inputBg,
            border:      `1px solid ${theme.inputBorder}`,
            color:       theme.text,
          }}
          onFocus={e  => e.target.style.borderColor = theme.inputFocus}
          onBlur={e   => e.target.style.borderColor = theme.inputBorder}
        />
        <button className="todo-input__add-btn" onClick={handleAdd}>
          Add
        </button>
      </div>

      {/* categories */}
      <div className="todo-input__pills">
        {CATEGORIES.map(cat => (
          <Pill key={cat} label={cat}
            active={category === cat}
            color={CAT_COLORS[cat]}
            onClick={() => setCategory(cat)} />
        ))}
      </div>

      {/* time estimate */}
      <div className="todo-input__pills">
        <span className="todo-input__label" style={{ color: theme.textMuted }}>⏱</span>
        {TIME_OPTIONS.map(t => (
          <Pill key={t} label={t}
            active={timeEst === t}
            color={TIME_COLORS[t]}
            onClick={() => setTimeEst(p => p === t ? "" : t)} />
        ))}
      </div>

      {/* tags */}
      <div>
        <button
          className="todo-input__tag-toggle"
          style={{ border: `1px solid ${theme.border}`, color: theme.textMuted }}
          onClick={() => setShowTagPicker(p => !p)}
          onMouseEnter={e => e.target.style.color = theme.text}
          onMouseLeave={e => e.target.style.color = theme.textMuted}
        >
          🏷 Tags {selTags.length > 0 ? `(${selTags.length})` : ""} {showTagPicker ? "▲" : "▼"}
        </button>

        {showTagPicker && (
          <div className="todo-input__pills todo-input__pills--tags">
            {TAGS.map(tag => (
              <Pill key={tag} label={tag}
                active={selTags.includes(tag)}
                color={TAG_COLORS[tag]}
                onClick={() => toggleTag(tag)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

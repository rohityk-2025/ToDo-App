import ThemeToggle from "./ThemeToggle";
import ProgressRing from "./ProgressRing";
import SyncBadge from "./SyncBadge";
import { useTheme } from "../context/ThemeContext";
import { useTodos } from "../context/TodoContext";
import "./Header.css";

export default function Header() {
  const { theme }          = useTheme();
  const { todos, syncStatus } = useTodos();
  const doneCount = todos.filter(t => t.done).length;

  return (
    <header className="app-header">
      <div className="app-header__left">
        <p className="app-header__eyebrow" style={{ color: theme.accent }}>
          YOUR TASKS
        </p>
        <h1 className="app-header__title" style={{ color: theme.text }}>
          Todo + Planner
        </h1>
        <SyncBadge status={syncStatus} />
      </div>

      <div className="app-header__right">
        <ThemeToggle />
        <ProgressRing done={doneCount} total={todos.length} />
        <span className="app-header__count" style={{ color: theme.textMuted }}>
          {doneCount}/{todos.length} done
        </span>
      </div>
    </header>
  );
}

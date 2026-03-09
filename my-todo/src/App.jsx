import { useState } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { TodoProvider }            from "./context/TodoContext";
import ThemeToggle from "./components/ThemeToggle";
import SyncBadge   from "./components/SyncBadge";
import TodoPage    from "./pages/TodoPage";
import PlannerPage from "./pages/PlannerPage";
import { useTodos } from "./context/TodoContext";
import "./App.css";

function AppShell() {
  const { theme }       = useTheme();
  const { syncStatus }  = useTodos();
  const [page, setPage] = useState("todo");

  return (
    <div className="app-shell" style={{ background: theme.bg, color: theme.text }}>

      {/* ── Navbar ── */}
      <nav
        className="app-navbar"
        style={{ background: theme.surface, borderBottom: `1px solid ${theme.border}` }}
      >
        <div className="app-navbar__inner">
          <div className="app-navbar__logo">
            <span> </span>
            <span className="app-navbar__logo-text" style={{ color: theme.text }}>
              ✧ Focus<span style={{ color: theme.accent }}>Flow</span>
            </span>
          </div>

          <div className="app-navbar__links">
            {[
              { id: "todo",    label: " Todo List",    short: "Todo"    },
              { id: "planner", label: " Week Planner", short: "Planner" },
            ].map(p => (
              <button
                key={p.id}
                className={`app-navbar__link ${page === p.id ? "app-navbar__link--active" : ""}`}
                onClick={() => setPage(p.id)}
                style={{
                  color:        page === p.id ? theme.accent : theme.textSub,
                  borderBottom: page === p.id
                    ? `2px solid ${theme.accent}`
                    : "2px solid transparent",
                }}
              >
                <span className="nav-full">{p.label}</span>
                <span className="nav-short">{p.short}</span>
              </button>
            ))}
          </div>

          <div className="app-navbar__right">
            <SyncBadge status={syncStatus} />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* ── Pages ── */}
      <main className="app-main">
        {page === "todo"    && <TodoPage    />}
        {page === "planner" && <PlannerPage />}
      </main>

      <footer className="app-footer" style={{ color: theme.textMuted }}>
        DOUBLE-CLICK TO EDIT · DRAG TO PLAN · ENTER TO ADD
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <AppShell />
      </TodoProvider>
    </ThemeProvider>
  );
}

import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

const PAGES = [
  { id: "todo",    label: "📝 Todo List",     short: "Todo"    },
  { id: "planner", label: "🗓️ Week Planner",  short: "Planner" },
];

export default function Navbar({ activePage, onNavigate }) {
  const { theme } = useTheme();

  return (
    <nav
      className="navbar"
      style={{
        background:   theme.surface,
        borderBottom: `1px solid ${theme.border}`,
      }}
    >
      <div className="navbar__inner">
        {/* Logo */}
        <div className="navbar__logo" style={{ color: theme.accent }}>
          <span className="navbar__logo-icon">⚡</span>
          <span className="navbar__logo-text" style={{ color: theme.text }}>
            Focus<span style={{ color: theme.accent }}>Flow</span>
          </span>
        </div>

        {/* Nav links */}
        <div className="navbar__links">
          {PAGES.map(p => (
            <button
              key={p.id}
              className={`navbar__link ${activePage === p.id ? "navbar__link--active" : ""}`}
              onClick={() => onNavigate(p.id)}
              style={{
                color: activePage === p.id ? theme.accent : theme.textSub,
                borderBottom: activePage === p.id
                  ? `2px solid ${theme.accent}`
                  : "2px solid transparent",
              }}
            >
              <span className="navbar__link-full">{p.label}</span>
              <span className="navbar__link-short">{p.short}</span>
            </button>
          ))}
        </div>

        {/* Right side — theme toggle imported inline */}
        <div className="navbar__right">
          <slot name="right" />
        </div>
      </div>
    </nav>
  );
}

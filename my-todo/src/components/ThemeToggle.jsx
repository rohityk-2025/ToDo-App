import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const { darkMode, setDarkMode, theme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={() => setDarkMode(p => !p)}
      title={theme.toggleLabel}
      style={{
        background:   theme.toggleBg,
        border:       `1px solid ${theme.border}`,
        color:        theme.textSub,
      }}
    >
      <span className="theme-toggle__icon">{theme.toggleIcon}</span>
      <span className="theme-toggle__label">{theme.toggleLabel}</span>
    </button>
  );
}

import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { DARK, LIGHT } from "../constants/theme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorage("theme-dark", true);
  const theme = darkMode ? DARK : LIGHT;

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, theme, DARK, LIGHT }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

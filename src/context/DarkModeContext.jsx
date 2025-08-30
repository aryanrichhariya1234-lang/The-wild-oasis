import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

export default function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useLocalStorageState(false, "isDarkMode");
  useEffect(
    function () {
      if (isDark) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDark]
  );
  function ToggleDarkMode() {
    setIsDark((isDark) => !isDark);
  }
  return (
    <DarkModeContext.Provider value={{ isDark, setIsDark, ToggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const useDark = useContext(DarkModeContext);
  return useDark;
}

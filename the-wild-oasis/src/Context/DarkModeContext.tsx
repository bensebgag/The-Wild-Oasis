import { FC, ReactNode, createContext, useContext, useState } from "react";

type DarkModeContextType = {
  isDarkMode: boolean;
  toogleDarkMode: () => void;
};
const defaultValue: DarkModeContextType = {
  isDarkMode: true,
  toogleDarkMode: () => {
    console.warn("toggleDarkMode called outside of DarkModeProvider");
  },
};

const DarkModeContext = createContext<DarkModeContextType>(defaultValue);
type DarkModeProviderProps = {
  children: ReactNode;
};
const DarkModeProvider: FC<DarkModeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  function toogleDarkMode() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    }
    if (!isDarkMode) {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toogleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("DarkModeContext was used outside of DarkMode provider");

  return context;
}

export { DarkModeProvider, useDarkMode };

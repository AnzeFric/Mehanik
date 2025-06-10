import { createContext, FC, ReactNode, useContext } from "react";
import { lightTheme, darkTheme } from "@/constants/Themes";
import useColorThemeStore from "@/stores/useColorThemeStore";

export type ThemeMode = "light" | "dark";

interface ProviderProps {
  children: ReactNode;
}

interface ThemeProps {
  theme: typeof lightTheme;
  selectedTheme: ThemeMode;
  setSelectedTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeProps | undefined>(undefined);

export const ThemeProvider: FC<ProviderProps> = ({ children }) => {
  const { selectedTheme, setSelectedTheme } = useColorThemeStore();

  const theme = selectedTheme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, selectedTheme, setSelectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

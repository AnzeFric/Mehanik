import { createContext, FC, ReactNode, useContext } from "react";
import useColorThemeStore from "@/stores/useColorThemeStore";
import { Colors } from "@/constants/Colors";

export type ThemeMode = "light" | "dark";

interface ProviderProps {
  children: ReactNode;
}

interface ThemeProps {
  theme: typeof Colors.light;
  selectedTheme: ThemeMode;
  setSelectedTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeProps | undefined>(undefined);

export const ThemeProvider: FC<ProviderProps> = ({ children }) => {
  const { selectedTheme, setSelectedTheme } = useColorThemeStore();

  const theme = selectedTheme === "light" ? Colors.light : Colors.dark;

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

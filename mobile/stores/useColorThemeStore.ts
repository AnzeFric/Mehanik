import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeMode } from "@/context/ThemeContext";

interface ColorThemeStore {
  selectedTheme: ThemeMode;
  setSelectedTheme: (selectedTheme: ThemeMode) => void;
  reset: () => void;
}

const initTheme: ThemeMode = "light";
const initialState = {
  selectedTheme: initTheme,
};

const useColorThemeStore = create(
  persist<ColorThemeStore>(
    (set) => ({
      ...initialState,
      setSelectedTheme: (selectedTheme: ThemeMode) => {
        set({ selectedTheme: selectedTheme });
      },
      reset: async () => {
        set(() => ({ ...initialState }));
        useColorThemeStore.persist.clearStorage();
      },
    }),
    {
      name: "colorThemeStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useColorThemeStore;

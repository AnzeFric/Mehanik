import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ColorThemeStore {
  isLight: Boolean;
  changeColorTheme: () => void;
}

export const useColorThemeStore = create(
  persist<ColorThemeStore>(
    (set, get) => ({
      isLight: true,
      changeColorTheme: () => {
        set({ isLight: !get().isLight });
      },
    }),
    {
      name: "colorThemeStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

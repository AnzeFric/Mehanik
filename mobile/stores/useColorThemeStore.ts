import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ColorThemeStore {
  isLight: Boolean;
  changeColorTheme: () => void;
  reset: () => void;
}

const initialState = {
  isLight: true,
};

const useColorThemeStore = create(
  persist<ColorThemeStore>(
    (set, get) => ({
      ...initialState,
      changeColorTheme: () => {
        set({ isLight: !get().isLight });
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

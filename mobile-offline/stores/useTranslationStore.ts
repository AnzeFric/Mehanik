import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Translation } from "@/interfaces/translation";

interface TranslationStore {
  selectedTranslation: Translation;
  setSelectedTranslation: (selectedTranslation: Translation) => void;
  reset: () => void;
}

const defaultTranslation: Translation = "en";
const initialState = {
  selectedTranslation: defaultTranslation,
};

const useTranslationStore = create(
  persist<TranslationStore>(
    (set) => ({
      ...initialState,
      setSelectedTranslation: (selectedTranslation: Translation) => {
        set({ selectedTranslation: selectedTranslation });
      },
      reset: async () => {
        set(() => ({ ...initialState }));
        useTranslationStore.persist.clearStorage();
      },
    }),
    {
      name: "translationStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useTranslationStore;

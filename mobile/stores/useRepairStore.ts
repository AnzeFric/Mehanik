import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RepairFocus } from "@/interfaces/repair";

interface RepairStore {
  currentRepairFocus: RepairFocus | null;
  setCurrentRepairFocus: (currentRepairFocus: RepairFocus | null) => void;
  reset: () => void;
}

const initialState = {
  currentRepairFocus: null,
};

const useRepairStore = create(
  persist<RepairStore>(
    (set) => ({
      ...initialState,
      setCurrentRepairFocus: (currentRepairFocus: RepairFocus | null) => {
        set({ currentRepairFocus: currentRepairFocus });
      },
      reset: async () => {
        set(() => ({ ...initialState }));
        useRepairStore.persist.clearStorage();
      },
    }),
    {
      name: "repairStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useRepairStore;

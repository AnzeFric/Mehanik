import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MechanicData } from "@/interfaces/user";

interface MechanicStore {
  mechanics: Array<MechanicData>;
  setMechanics: (mechanics: Array<MechanicData>) => void;
  reset: () => void;
}

const initialState = {
  mechanics: [],
};

const useMechanicStore = create(
  persist<MechanicStore>(
    (set) => ({
      ...initialState,
      setMechanics: (mechanics: Array<MechanicData>) => {
        set({ mechanics: mechanics });
      },
      reset: async () => {
        set(() => ({ ...initialState }));
        useMechanicStore.persist.clearStorage();
      },
    }),
    {
      name: "mechanicStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useMechanicStore;

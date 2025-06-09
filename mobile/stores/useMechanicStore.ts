import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MechanicData2 } from "@/interfaces/user";

interface MechanicStore {
  mechanics: Array<MechanicData2>;
  setMechanics: (mechanics: Array<MechanicData2>) => void;
  reset: () => void;
}

const initialState = {
  mechanics: [],
};

const useMechanicStore = create(
  persist<MechanicStore>(
    (set) => ({
      ...initialState,
      setMechanics: (mechanics: Array<MechanicData2>) => {
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

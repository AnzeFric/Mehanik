import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MechanicData } from "@/interfaces/user";

interface MechanicStore {
  currentMechanic: MechanicData;
  mechanics: Array<MechanicData>;
  setCurrentMechanic: (currentMechanic: MechanicData) => void;
  setMechanics: (mechanics: Array<MechanicData>) => void;
  reset: () => void;
}

const initialState = {
  mechanics: [],
  currentMechanic: {
    firstName: "",
    lastName: "",
    email: "",
    info: {
      address: null,
      city: null,
      image: null,
      phone: null,
      prices: {
        largeRepair: null,
        smallRepair: null,
        tyreChange: null,
      },
    },
  },
};

const useMechanicStore = create(
  persist<MechanicStore>(
    (set) => ({
      ...initialState,
      setCurrentMechanic: (currentMechanic: MechanicData) => {
        set({ currentMechanic: currentMechanic });
      },
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

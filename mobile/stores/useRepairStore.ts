import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomerData, ServiceData } from "@/interfaces/mechanic";

interface RepairStore {
  customers: Array<CustomerData>;
  currentRepairFocus: ServiceData | null;
  setCustomers: (customers: Array<CustomerData>) => void;
  setCurrentRepairFocus: (currentRepairFocus: ServiceData | null) => void;
  reset: () => void;
}

const initialState = {
  customers: [],
  currentRepairFocus: null,
};

const useRepairStore = create(
  persist<RepairStore>(
    (set) => ({
      ...initialState,
      setCustomers: (customers: Array<CustomerData>) => {
        set({ customers: customers });
      },
      setCurrentRepairFocus: (currentRepairFocus: ServiceData | null) => {
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

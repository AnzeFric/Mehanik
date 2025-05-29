import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomerData, ServiceData } from "@/interfaces/mechanic";

interface RepairStore {
  customers: Array<CustomerData>;
  repairs: Array<ServiceData>;
  setCustomers: (customers: Array<CustomerData>) => void;
  setRepairs: (repairs: Array<ServiceData>) => void;
  reset: () => void;
}

const initialState = {
  customers: [],
  repairs: [],
};

const useRepairStore = create(
  persist<RepairStore>(
    (set) => ({
      ...initialState,
      setCustomers: (customers: Array<CustomerData>) => {
        set({ customers: customers });
      },
      setRepairs: (repairs: Array<ServiceData>) => {
        set({ repairs: repairs });
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

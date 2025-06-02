import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomerVehicleData } from "@/interfaces/customer";

interface CustomerStore {
  customers: Array<CustomerVehicleData>;
  setCustomers: (customers: Array<CustomerVehicleData>) => void;
  reset: () => void;
}

const initialState = {
  customers: [],
};

const useCustomerStore = create(
  persist<CustomerStore>(
    (set) => ({
      ...initialState,
      setCustomers: (customers: Array<CustomerVehicleData>) => {
        set({ customers: customers });
      },
      reset: async () => {
        set(() => ({ ...initialState }));
        useCustomerStore.persist.clearStorage();
      },
    }),
    {
      name: "customerStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useCustomerStore;

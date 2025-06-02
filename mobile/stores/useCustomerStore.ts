import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomerData } from "@/interfaces/mechanic";

interface CustomerStore {
  customers: Array<CustomerData>;
  setCustomers: (customers: Array<CustomerData>) => void;
  reset: () => void;
}

const initialState = {
  customers: [],
};

const useCustomerStore = create(
  persist<CustomerStore>(
    (set) => ({
      ...initialState,
      setCustomers: (customers: Array<CustomerData>) => {
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

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomerVehicleData } from "@/interfaces/customer";

interface CustomerStore {
  customers: Array<CustomerVehicleData>;
  shouldRefetch: Boolean;
  setCustomers: (customers: Array<CustomerVehicleData>) => void;
  setShouldRefetch: (shouldRefresh: Boolean) => void;
  reset: () => void;
}

const initialState = {
  customers: [],
  shouldRefetch: false,
};

const useCustomerStore = create(
  persist<CustomerStore>(
    (set) => ({
      ...initialState,
      setCustomers: (customers: Array<CustomerVehicleData>) => {
        set({ customers: customers });
      },
      setShouldRefetch: (shouldRefetch: Boolean) => {
        set({ shouldRefetch: shouldRefetch });
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

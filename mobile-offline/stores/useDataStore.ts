import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomerFormData } from "@/interfaces/customer";

interface DataStore {
  customers: Array<CustomerFormData>;
  setCustomers: (customers: Array<CustomerFormData>) => void;
  reset: () => void;
}

const initialState = {
  customers: [],
};

const useDataStore = create(
  persist<DataStore>(
    (set) => ({
      ...initialState,
      setCustomers: (customers: Array<CustomerFormData>) => {
        set({ customers: customers });
      },
      reset: async () => {
        set(() => ({ ...initialState }));
        useDataStore.persist.clearStorage();
      },
    }),
    {
      name: "dataStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useDataStore;

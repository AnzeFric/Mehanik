import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomerFormData } from "@/interfaces/customer";

interface DataStore {
  customers: Array<CustomerFormData>;
  setCustomers: (customers: Array<CustomerFormData>) => void;
  deleteCustomer: (customerId: number) => void;
  reset: () => void;
}

const initialState = {
  customers: [],
};

const useDataStore = create(
  persist<DataStore>(
    (set, get) => ({
      ...initialState,
      setCustomers: (customers: Array<CustomerFormData>) => {
        set({ customers: customers });
      },
      deleteCustomer: (customerId: number) => {
        // Exclude the customer we want to delete
        const excludedCustomers = get().customers.filter(
          (customer) => customer.id != customerId
        );
        // Update the ids
        const newIdCustomers = excludedCustomers.map((customer, index) => {
          return { ...customer, id: index };
        });
        set({ customers: newIdCustomers });
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

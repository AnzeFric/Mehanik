import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface VehicleStore {
  shouldRefetch: Boolean;
  setShouldRefetch: (shouldRefetch: Boolean) => void;
  reset: () => void;
}

const initialState = {
  shouldRefetch: false,
};

const useVehicleStore = create(
  persist<VehicleStore>(
    (set) => ({
      ...initialState,
      setShouldRefetch: (shouldRefetch: Boolean) => {
        set({ shouldRefetch: shouldRefetch });
      },
      reset: async () => {
        set(() => ({ ...initialState }));
        useVehicleStore.persist.clearStorage();
      },
    }),
    {
      name: "vehicleStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useVehicleStore;

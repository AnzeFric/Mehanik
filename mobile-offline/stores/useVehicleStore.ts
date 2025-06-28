import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VehicleData } from "@/interfaces/vehicle";

interface VehicleStore {
  shouldRefetch: Boolean;
  vehicles: Array<VehicleData>;
  setShouldRefetch: (shouldRefetch: Boolean) => void;
  setVehicles: (vehicles: Array<VehicleData>) => void;
  reset: () => void;
}

const initialState = {
  shouldRefetch: false,
  vehicles: [],
};

const useVehicleStore = create(
  persist<VehicleStore>(
    (set) => ({
      ...initialState,
      setShouldRefetch: (shouldRefetch: Boolean) => {
        set({ shouldRefetch: shouldRefetch });
      },
      setVehicles: (vehicles: Array<VehicleData>) => {
        set({ vehicles: vehicles });
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

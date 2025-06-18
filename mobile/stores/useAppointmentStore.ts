import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserAppointmentData } from "@/interfaces/appointment";

interface AppointmentStore {
  // Variables for mechanic side
  shouldRefetch: Boolean;
  userAppointments: Array<UserAppointmentData>;
  setShouldRefetch: (shouldRefetch: Boolean) => void;
  setUserAppointments: (userAppointments: Array<UserAppointmentData>) => void;

  // Variables for user side
  // NaN
  reset: () => void;
}

const initialState = {
  shouldRefetch: false,
  userAppointments: [],
};

const useAppointmentStore = create(
  persist<AppointmentStore>(
    (set) => ({
      ...initialState,
      setShouldRefetch: (shouldRefetch: Boolean) => {
        set({ shouldRefetch: shouldRefetch });
      },
      setUserAppointments: (userAppointments: Array<UserAppointmentData>) => {
        set({ userAppointments: userAppointments });
      },
      reset: async () => {
        set(() => ({ ...initialState }));
        useAppointmentStore.persist.clearStorage();
      },
    }),
    {
      name: "appointmentStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAppointmentStore;

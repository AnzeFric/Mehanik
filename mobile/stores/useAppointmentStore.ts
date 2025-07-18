import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AppointmentStatus,
  UserAppointmentData,
} from "@/interfaces/appointment";

interface AppointmentStore {
  shouldRefetch: Boolean;
  userAppointments: Array<UserAppointmentData>;
  setShouldRefetch: (shouldRefetch: Boolean) => void;
  setUserAppointments: (userAppointments: Array<UserAppointmentData>) => void;
  getUserAppointments: (
    statuses: Array<AppointmentStatus>
  ) => Array<UserAppointmentData>;
  reset: () => void;
}

const initialState = {
  shouldRefetch: false,
  userAppointments: [],
};

// Convert date strings back to Date objects
const convertDatesToObjects = (appointments: Array<UserAppointmentData>) => {
  return appointments.map((appointment) => ({
    ...appointment,
    startDate: new Date(appointment.startDate),
    endDate: new Date(appointment.endDate),
  }));
};

const useAppointmentStore = create(
  persist<AppointmentStore>(
    (set, get) => ({
      ...initialState,
      setShouldRefetch: (shouldRefetch: Boolean) => {
        set({ shouldRefetch: shouldRefetch });
      },
      setUserAppointments: (userAppointments: Array<UserAppointmentData>) => {
        set({ userAppointments: userAppointments });
      },
      getUserAppointments: (statuses: Array<AppointmentStatus>) => {
        const appointments = get().userAppointments.filter((appointment) =>
          statuses.includes(appointment.status)
        );
        return convertDatesToObjects(appointments);
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

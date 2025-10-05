import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserStore {
  firstName: string;
  lastName: string;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  reset: () => void;
}

const initialState = {
  firstName: "",
  lastName: "",
};

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      ...initialState,
      setFirstName: (firstName: string) => {
        set({ firstName: firstName });
      },
      setLastName: (lastName: string) => {
        set({ lastName: lastName });
      },
      reset: async () => {
        set(() => ({ ...initialState }));
        useUserStore.persist.clearStorage();
      },
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;

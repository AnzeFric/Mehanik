import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserStore {
  firstName: string;
  lastName: string;
  firstLogin: boolean;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setFirstLogin: (firstLogin: boolean) => void;
  reset: () => void;
}

const initialState = {
  firstName: "",
  lastName: "",
  firstLogin: true,
};

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      ...initialState,
      setFirstName: (firstName: string) => {
        set({
          firstName: firstName,
        });
      },
      setLastName: (lastName: string) => {
        set({
          lastName: lastName,
        });
      },
      setFirstLogin: (firstLogin: boolean) => {
        set({
          firstLogin: firstLogin,
        });
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

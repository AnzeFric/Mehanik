import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MechanicData, AccountType } from "@/interfaces/user";

interface UserStore {
  currentUser: MechanicData;
  firstLogin: boolean;
  setCurrentUser: (currentUser: MechanicData) => void;
  setFirstLogin: (firstLogin: boolean) => void;
  reset: () => void;
}

const accountType: AccountType = "user";
const initialState = {
  currentUser: {
    firstName: "",
    lastName: "",
    email: "",
    accountType,
    info: {
      address: null,
      city: null,
      image: null,
      phone: null,
      prices: {
        largeRepair: null,
        smallRepair: null,
        tyreChange: null,
      },
      workHours: null,
    },
  },
  firstLogin: true,
};

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      ...initialState,
      setCurrentUser: (currentUser: MechanicData) => {
        set({
          currentUser: currentUser,
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

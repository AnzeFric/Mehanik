import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AccountType } from "@/interfaces/account";

interface UserStore {
  firstName: string;
  lastName: string;
  accountType: AccountType;
  firstLogin: boolean;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setAccountType: (accountType: AccountType) => void;
  setFirstLogin: (firstLogin: boolean) => void;
  reset: () => void;
}

const accountType: AccountType = "user";
const initialState = {
  firstName: "",
  lastName: "",
  accountType,
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
      setAccountType: (accountType: AccountType) => {
        set({
          accountType: accountType,
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

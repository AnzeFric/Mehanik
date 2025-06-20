import { create } from "zustand";
import EncryptedStorage from "react-native-encrypted-storage";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  jwt: string | null;
  expiredTimestamp: number;
  isLoggined: boolean;
  setJwt: (jwt: string | null) => void;
  setExpiredTimestamp: (expiredTimestamp: number) => void;
  setIsLoggined: (isLoggined: boolean) => void;
  reset: () => void;
}

const initialState = {
  jwt: null,
  expiredTimestamp: 0,
  isLoggined: false,
};

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      ...initialState,
      setJwt: (jwt: string | null) => {
        set({ jwt: jwt });
      },
      setExpiredTimestamp: (expiredTimestamp: number) => {
        set({ expiredTimestamp: expiredTimestamp });
      },
      setIsLoggined: (isLoggined: boolean) => {
        set({ isLoggined: isLoggined });
      },
      reset: async () => {
        set(() => ({ ...initialState }));
        useAuthStore.persist.clearStorage();
      },
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => EncryptedStorage),
    }
  )
);

export default useAuthStore;

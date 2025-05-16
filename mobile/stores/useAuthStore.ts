import { create } from "zustand";
import EncryptedStorage from "react-native-encrypted-storage";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  jwt: string | null;
  expiresIn: number;
  isLoggined: boolean;
  setJwt: (jwt: string | null) => void;
  setExpiresIn: (expiresIn: number) => void;
  setIsLoggined: (isLoggined: boolean) => void;
  reset: () => void;
}

const initialState = {
  jwt: null,
  expiresIn: 0,
  isLoggined: false,
};

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      ...initialState,
      setJwt: (jwt: string | null) => {
        set({ jwt: jwt });
      },
      setExpiresIn: (expiresIn: number) => {
        set({ expiresIn: expiresIn });
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

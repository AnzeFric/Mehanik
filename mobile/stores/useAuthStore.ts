import { create } from "zustand";
import EncryptedStorage from "react-native-encrypted-storage";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  jwt: string | null;
  expiration: number;
  issuedTime: number;
  isLoggined: boolean;
  setJwt: (jwt: string | null) => void;
  setExpiration: (expiresIn: number) => void;
  setIssuedTime: (issued: number) => void;
  setIsLoggined: (isLoggined: boolean) => void;
  reset: () => void;
}

const initialState = {
  jwt: null,
  expiration: 0,
  issuedTime: 0,
  isLoggined: false,
};

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      ...initialState,
      setJwt: (jwt: string | null) => {
        set({ jwt: jwt });
      },
      setExpiration: (expiration: number) => {
        set({ expiration: expiration });
      },
      setIssuedTime: (issuedTime: number) => {
        set({ issuedTime: issuedTime });
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

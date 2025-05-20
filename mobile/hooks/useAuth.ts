import useAuthStore from "@/stores/useAuthStore";
import { router } from "expo-router";
import BetterFetch from "@/constants/BetterFetch";
import { API_BASE_URL } from "@/constants/Config";
import { AccountType } from "@/interfaces/account";
import { Alert } from "react-native";

export function useAuth() {
  const { isLoggined, setJwt, setExpiresIn, setIsLoggined } = useAuthStore();

  const handleRegister = async (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    accountType: AccountType
  ) => {
    try {
      const response = await BetterFetch(
        `${API_BASE_URL}/auth/register`,
        "POST",
        JSON.stringify({
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
          accountType: accountType,
        })
      );

      if (response) {
        router.push("/(auth)/login");
      } else {
        Alert.alert(
          "Napaka",
          "Prišlo je do napake pri registracije. Poskusite ponovno kasneje."
        );
      }
    } catch (error) {
      console.error("Error while registering: ", error);
    }
  };

  const handleLogin = async () => {
    try {
      console.log("Login clicked");
    } catch (error) {
      console.error("Error while logging in: ", error);
    }
  };

  const handleLogout = () => {
    useAuthStore.getState().reset();
    router.replace("/(auth)/login"); // Using replace to prevent returning with hardware back button
  };

  return {
    isLoggined,
    handleRegister,
    handleLogin,
    handleLogout,
  };
}

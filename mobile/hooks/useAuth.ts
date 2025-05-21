import useAuthStore from "@/stores/useAuthStore";
import { router } from "expo-router";
import { API_BASE_URL } from "@/constants/Config";
import { AccountType } from "@/interfaces/account";
import { Alert } from "react-native";

export function useAuth() {
  const { isLoggined, setJwt, setExpiration, setIsLoggined } = useAuthStore();

  const handleRegister = async (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    accountType: AccountType
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
          accountType: accountType,
        }),
      });

      const data = await response.json();

      if (data.success) {
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

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const accountType: AccountType = data.data.accountType;
        const jwt = data.data.jwt;
        const expiration = data.data.expiration;

        setJwt(jwt);
        setExpiration(expiration);
        setIsLoggined(true);
        router.replace(
          accountType === "user" ? "/(tabs-user)" : "/(tabs-mechanic)"
        );
      } else {
        Alert.alert(
          "Napaka",
          "Prišlo je do napake pri prijavi. Poskusite ponovno kasneje."
        );
      }
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

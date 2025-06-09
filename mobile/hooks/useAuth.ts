import useAuthStore from "@/stores/useAuthStore";
import { router } from "expo-router";
import { API_BASE_URL } from "@/constants/Config";
import { AccountType } from "@/interfaces/account";
import { Alert } from "react-native";

export function useAuth() {
  const {
    isLoggined,
    expiredTimestamp,
    setJwt,
    setExpiredTimestamp,
    setIsLoggined,
  } = useAuthStore();

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
        const jwt = data.token;
        const decodedJwt = decodeJWT(jwt);

        setJwt(jwt);
        setExpiredTimestamp(decodedJwt.exp);
        setIsLoggined(true);

        router.replace("/");
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
    router.dismissAll();
    router.replace("/(auth)/login");
  };

  function decodeJWT(token: string) {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }

    const payload = parts[1];
    const decodedPayload = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );

    return decodedPayload;
  }

  return {
    isLoggined,
    expiredTimestamp,
    handleRegister,
    handleLogin,
    handleLogout,
  };
}

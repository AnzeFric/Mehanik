import useAuthStore from "@/stores/accounts/useAuthStore";
import { router } from "expo-router";
import { API_BASE_URL } from "@/constants/config";
import { AccountType } from "@/interfaces/user";

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
      const data = await fetch(`${API_BASE_URL}/auth/register`, {
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
      }).then((response) => response.json());

      if (data.success) {
        return true;
      }
      console.log("Error registering: ", data.message);
      return false;
    } catch (error) {
      console.error("Error while registering: ", error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then((response) => response.json());

      if (data.success) {
        const jwt = data.token;
        const decodedJwt = decodeJWT(jwt);

        setJwt(jwt);
        setExpiredTimestamp(decodedJwt.exp);
        setIsLoggined(true);
        return true;
      }
      console.log("Error logging in: ", data.message);
      return false;
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

import useAuthStore from "@/stores/useAuthStore";
import { router } from "expo-router";

export function useAuth() {
  const { isLoggined, setJwt, setExpiresIn, setIsLoggined } = useAuthStore();

  const handleRegister = async () => {
    try {
      console.log("Register clicked");
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

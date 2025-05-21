import { router } from "expo-router";
import useUserStore from "@/stores/useUserStore";
import { API_BASE_URL } from "@/constants/Config";
import { resetAllStores } from "@/constants/util";
import useAuthStore from "@/stores/useAuthStore";

export function useUser() {
  const {
    firstName,
    lastName,
    firstLogin,
    accountType,
    setFirstName,
    setLastName,
    setFirstLogin,
    setAccountType,
  } = useUserStore();

  const { jwt } = useAuthStore();

  const getUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });

      const data = await response.json();

      if (data.success) {
        const firstName = data.user.first_name;
        const lastName = data.user.last_name;
        const accountType = data.user.account_type;

        setFirstName(firstName);
        setLastName(lastName);
        setAccountType(accountType);
        return true;
      }

      console.log("Failed to get user");
      return false;
    } catch (error) {
      console.error("Error fetching user: ", error);
      return false;
    }
  };

  const deleteUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });

      const data = await response.json();

      if (data.success) {
        resetAllStores();
        router.replace("/(auth)/login"); // Using replace to prevent returning with hardware back button
      } else {
        console.log("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return {
    firstName,
    lastName,
    firstLogin,
    accountType,
    getUser,
    deleteUser,
    setFirstLogin,
  };
}

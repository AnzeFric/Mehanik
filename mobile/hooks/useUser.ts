import { router } from "expo-router";
import useUserStore from "@/stores/useUserStore";
import { API_BASE_URL } from "@/constants/Config";
import { resetAllStores } from "@/constants/util";
import useAuthStore from "@/stores/useAuthStore";
import { Alert } from "react-native";

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
        console.log("User fetching successfully");
        return true;
      }

      console.error("Failed to get user");
      return false;
    } catch (error) {
      console.error("Error fetching user: ", error);
      return false;
    }
  };

  const updateUser = async (firstName?: string, lastName?: string) => {
    try {
      if (firstName === undefined && lastName === undefined) {
        return false;
      }

      const body = {
        ...(firstName !== undefined && { firstName }),
        ...(lastName !== undefined && { lastName }),
      };

      const response = await fetch(`${API_BASE_URL}/users/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        firstName != undefined && setFirstName(firstName);
        lastName != undefined && setLastName(lastName);
        Alert.alert("Uspeh!", "Podatki uspešno posodobljeni!");
        return true;
      }

      Alert.alert(
        "Napaka!",
        "Napaka pri posodabljanju podatkov. Prosimo poskusite kasneje."
      );
      return false;
    } catch (error) {
      console.error("Error updating user: ", error);
      return false;
    }
  };

  const deleteUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });

      const data = await response.json();

      if (data.success) {
        resetAllStores();
        router.replace("/(auth)/login");
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const getMechanics = async () => {
    try {
      console.log("getMechanics req");
      const response = await fetch(`${API_BASE_URL}/users/mechanics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });
      const data = await response.json();

      if (data.success) {
        console.log("Returned mechanics data: ");
        console.log(JSON.stringify(data));
        return data.mechanics;
      }
      console.error("Error fetching mechanics: ", data.message);
    } catch (error) {
      console.error("Error while fetching mechanics: ", error);
    }
  };

  return {
    firstName,
    lastName,
    firstLogin,
    accountType,
    getUser,
    updateUser,
    deleteUser,
    setFirstLogin,
    getMechanics,
  };
}

import { router } from "expo-router";
import useUserStore from "@/stores/useUserStore";
import { API_BASE_URL } from "@/constants/Config";
import { resetAllStores } from "@/constants/util";
import useAuthStore from "@/stores/useAuthStore";
import { Alert } from "react-native";
import { MechanicData } from "@/interfaces/user";

export function useUser() {
  const { currentUser, firstLogin, setFirstLogin, setCurrentUser } =
    useUserStore();

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
        let user: MechanicData = {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          accountType: data.user.accountType,
          info: {
            address: null,
            city: null,
            image: null,
            phone: null,
            prices: {
              largeRepair: null,
              smallRepair: null,
              tyreChange: null,
            },
            ...data.user.info,
          },
        };
        setCurrentUser(user);
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

  const updateUser = async (newUserData: MechanicData) => {
    try {
      const userData = {
        firstName: newUserData.firstName,
        lastName: newUserData.lastName,
      };
      const mechanicData = {
        address: newUserData.info.address,
        city: newUserData.info.city,
        image: newUserData.info.image,
        phone: newUserData.info.phone,
        prices: newUserData.info.prices,
      };

      const response = await fetch(`${API_BASE_URL}/users/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          userData: userData,
          mechanicData: mechanicData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCurrentUser(newUserData);
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
      const response = await fetch(`${API_BASE_URL}/users/mechanics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });
      const data = await response.json();

      if (data.success) {
        console.log("Successfully fetched mechanics data");
        return data.mechanics;
      }
      console.error("Error fetching mechanics: ", data.message);
    } catch (error) {
      console.error("Error while fetching mechanics: ", error);
    }
  };

  return {
    firstLogin,
    getUser,
    updateUser,
    deleteUser,
    setFirstLogin,
    getMechanics,
  };
}

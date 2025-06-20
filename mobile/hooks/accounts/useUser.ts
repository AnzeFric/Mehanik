import useUserStore from "@/stores/accounts/useUserStore";
import { API_BASE_URL } from "@/constants/Config";
import { resetAllStores } from "@/constants/util";
import useAuthStore from "@/stores/accounts/useAuthStore";
import { MechanicData } from "@/interfaces/user";
import useMechanicStore from "@/stores/accounts/useMechanicStore";

export function useUser() {
  const { firstLogin, setFirstLogin, setCurrentUser } = useUserStore();
  const { setMechanics } = useMechanicStore();

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
        return true;
      }
      console.error("Failed to get user: ", data.message);
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
        return true;
      }
      console.error("Error updating user: ", data.message);
      return false;
    } catch (error) {
      console.error("Error ehile updating user: ", error);
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
        return true;
      }
      console.log("Error deleting user: ", data.message);
      return false;
    } catch (error) {
      console.error("Error while deleting user: ", error);
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
        setMechanics(data.mechanics);
        return true;
      }
      console.error("Error fetching mechanics: ", data.message);
      return false;
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

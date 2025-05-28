import useAuthStore from "@/stores/useAuthStore";
import { API_BASE_URL } from "@/constants/Config";

export function useMechanic() {
  const { jwt } = useAuthStore();

  const getMechanics = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/mechanics/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });
      const data = await response.json();

      if (data.success) {
        return data.mechanics;
      }
      console.error("Error fetching mechanics: ", data.message);
    } catch (error) {
      console.error("Error while fetching mechanics: ", error);
    }
  };

  return {
    getMechanics,
  };
}

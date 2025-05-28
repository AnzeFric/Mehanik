import useAuthStore from "@/stores/useAuthStore";
import { API_BASE_URL } from "@/constants/Config";
import useMechanicStore from "@/stores/useMechanicStore";

export function useMechanic() {
  const { jwt } = useAuthStore();
  const { mechanics, setMechanics } = useMechanicStore();

  const getMechanics = async () => {
    try {
      console.log("getMechanics req");
      const response = await fetch(`${API_BASE_URL}/mechanics/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });
      const data = await response.json();

      if (data.success) {
        setMechanics(data.mechanics);
        return data.mechanics;
      }
      console.error("Error fetching mechanics: ", data.message);
    } catch (error) {
      console.error("Error while fetching mechanics: ", error);
    }
  };

  return {
    mechanics,
    getMechanics,
  };
}

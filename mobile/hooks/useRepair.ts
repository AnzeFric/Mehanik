import useAuthStore from "@/stores/useAuthStore";
import { API_BASE_URL } from "@/constants/Config";
import useRepairStore from "@/stores/useRepairStore";

export function useRepair() {
  const { jwt } = useAuthStore();
  const { currentRepairFocus, setCurrentRepairFocus } = useRepairStore();

  const getVehicleRepairs = async (vehicleVin: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/repairs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ vin: vehicleVin }),
      });

      const data = await response.json();

      if (data.success) {
        return data.repairs;
      }
      console.log("Error fetching mechanic vehicle repairs: ", data.message);
      return [];
    } catch (error) {
      console.error("Error while fetching mechanic vehicle repairs: ", error);
    }
  };

  return {
    currentRepairFocus,
    setCurrentRepairFocus,
    getVehicleRepairs,
  };
}

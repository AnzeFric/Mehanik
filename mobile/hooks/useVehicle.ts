import { API_BASE_URL } from "@/constants/Config";
import { VehicleData } from "@/interfaces/vehicle";
import useAuthStore from "@/stores/useAuthStore";

export function useVehicle() {
  const { jwt } = useAuthStore();

  const updateVehicle = async (
    vehicleVin: string,
    vehicleData: VehicleData
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/vehicles/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          vehicleVin: vehicleVin,
          vehicleData: vehicleData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Vehicle data updated successfully");
        return true;
      }
      console.log("Error updating vehicle data");
      return false;
    } catch (error) {
      console.error("Error while updating vehicle data: ", error);
    }
  };

  return {
    updateVehicle,
  };
}

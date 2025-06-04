import { API_BASE_URL } from "@/constants/Config";
import { VehicleData } from "@/interfaces/vehicle";
import useAuthStore from "@/stores/useAuthStore";

export function useVehicle() {
  const { jwt } = useAuthStore();

  const saveVehicle = async (
    customerUuid: string,
    vehicleData: VehicleData
  ) => {
    console.log("Saving vehicle: ", vehicleData);

    try {
      const response = await fetch(`${API_BASE_URL}/vehicles/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          customerUuid: customerUuid,
          vehicleData: vehicleData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Successfully saved vehicle");
        return true;
      }
      console.log("Error saving vehicle");
      return false;
    } catch (error) {
      console.error("Error while saving customer vehicle");
    }
  };

  const updateVehicle = async (vehicleData: VehicleData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/vehicles/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
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
    saveVehicle,
    updateVehicle,
  };
}

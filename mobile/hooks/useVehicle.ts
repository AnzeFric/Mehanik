import { API_BASE_URL } from "@/constants/Config";
import useAuthStore from "@/stores/useAuthStore";
import { VehicleData } from "@/interfaces/vehicle";

export function useVehicle() {
  const { jwt } = useAuthStore();

  const fetchVehicles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/vehicles/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });

      const data = await response.json();

      if (data.success) {
        return data.vehicles;
      }
      return [];
    } catch (error) {
      console.error("Error fetching vehicles: ", error);
    }
  };

  const saveVehicle = async (vehicle: VehicleData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/vehicles/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ vehicleData: vehicle }),
      });

      const data = await response.json();

      if (data.success) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error saving vehicle: ", error);
    }
  };

  const updateVehicle = async (vehicle: VehicleData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/vehicles/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ vehicleData: vehicle }),
      });

      const data = await response.json();

      if (data.success) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error patching vehicle: ", error);
    }
  };

  return { fetchVehicles, saveVehicle, updateVehicle };
}

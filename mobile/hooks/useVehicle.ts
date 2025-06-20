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
      console.error("Error fetching vehicles: ", data.message);
      return [];
    } catch (error) {
      console.error("Error while fetching vehicles: ", error);
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
      console.error("Error saving vehicle: ", data.message);
      return false;
    } catch (error) {
      console.error("Error while saving vehicle: ", error);
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
      console.error("Error patching vehicle: ", data.message);
      return false;
    } catch (error) {
      console.error("Error while patching vehicle: ", error);
    }
  };

  const deleteVehicle = async (vehicleUuid: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/vehicles/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ vehicleUuid: vehicleUuid }),
      });

      const data = await response.json();

      if (data.success) {
        return true;
      }
      console.error("Error deleting vehicle: ", data.message);
      return false;
    } catch (error) {
      console.error("Error while deleting vehicle: ", error);
    }
  };

  return {
    fetchVehicles,
    saveVehicle,
    updateVehicle,
    deleteVehicle,
  };
}

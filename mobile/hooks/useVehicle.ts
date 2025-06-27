import { API_BASE_URL } from "@/constants/config";
import useAuthStore from "@/stores/accounts/useAuthStore";
import { VehicleData } from "@/interfaces/vehicle";

export function useVehicle() {
  const { jwt } = useAuthStore();

  const fetchVehicles = async () => {
    try {
      const data = await fetch(`${API_BASE_URL}/vehicles/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      }).then((response) => response.json());

      if (data.success) {
        return data.vehicles;
      }
      console.log("Error fetching vehicles: ", data.message);
      return [];
    } catch (error) {
      console.error("Error while fetching vehicles: ", error);
    }
  };

  const saveVehicle = async (vehicle: VehicleData) => {
    try {
      const data = await fetch(`${API_BASE_URL}/vehicles/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ vehicleData: vehicle }),
      }).then((response) => response.json());

      if (data.success) {
        return true;
      }
      console.log("Error saving vehicle: ", data.message);
      return false;
    } catch (error) {
      console.error("Error while saving vehicle: ", error);
    }
  };

  const updateVehicle = async (vehicle: VehicleData) => {
    try {
      const data = await fetch(`${API_BASE_URL}/vehicles/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ vehicleData: vehicle }),
      }).then((response) => response.json());

      if (data.success) {
        return true;
      }
      console.log("Error patching vehicle: ", data.message);
      return false;
    } catch (error) {
      console.error("Error while patching vehicle: ", error);
    }
  };

  const deleteVehicle = async (vehicleUuid: string) => {
    try {
      const data = await fetch(`${API_BASE_URL}/vehicles/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ vehicleUuid: vehicleUuid }),
      }).then((response) => response.json());

      if (data.success) {
        return true;
      }
      console.log("Error deleting vehicle: ", data.message);
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

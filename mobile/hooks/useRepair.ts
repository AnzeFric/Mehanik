import useAuthStore from "@/stores/useAuthStore";
import { API_BASE_URL } from "@/constants/Config";
import useRepairStore from "@/stores/useRepairStore";
import { RepairData } from "@/interfaces/repair";

export function useRepair() {
  const { jwt } = useAuthStore();
  const { currentRepairFocus, setCurrentRepairFocus } = useRepairStore();

  const getVehicleRepairs = async (vehicleVin: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/repairs/get`, {
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

  const saveVehicleRepairs = async (
    vehicleVin: string,
    repairData: RepairData
  ) => {
    try {
      const formattedData = {
        ...repairData,
        date: repairData.date.toISOString(),
      };

      console.log(formattedData);
      await fetch(`${API_BASE_URL}/repairs/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ vin: vehicleVin, repairs: formattedData }),
      });
    } catch (error) {
      console.error("Error while saving vehicle repairs: ", error);
    }
  };

  return {
    currentRepairFocus,
    setCurrentRepairFocus,
    getVehicleRepairs,
    saveVehicleRepairs,
  };
}

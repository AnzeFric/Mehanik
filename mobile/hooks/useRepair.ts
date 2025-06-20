import useAuthStore from "@/stores/accounts/useAuthStore";
import { API_BASE_URL } from "@/constants/Config";
import useRepairStore from "@/stores/useRepairStore";
import { RepairData } from "@/interfaces/repair";

export function useRepair() {
  const { jwt } = useAuthStore();
  const { currentRepairFocus, setCurrentRepairFocus } = useRepairStore();

  const getVehicleRepairs = async (vehicleUuid: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/repairs/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ vehicleUuid: vehicleUuid }),
      });

      const data = await response.json();

      if (data.success) {
        const repairsWithDates = data.repairs.map((repair: any) => ({
          ...repair,
          date: new Date(repair.date),
        }));

        return repairsWithDates;
      }
      console.log("Error fetching mechanic vehicle repairs: ", data.message);
      return [];
    } catch (error) {
      console.error("Error while fetching mechanic vehicle repairs: ", error);
    }
  };

  const saveVehicleRepairs = async (
    vehicleUuid: string,
    repairData: RepairData
  ) => {
    try {
      const formattedData = {
        ...repairData,
        date: repairData.date.toISOString(),
      };

      const response = await fetch(`${API_BASE_URL}/repairs/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          vehicleUuid: vehicleUuid,
          repairData: formattedData,
        }),
      });

      const data = await response.json();
      if (data.success) {
        return true;
      }
      console.log("Error saving vehicle repair: ", data.message);
      return false;
    } catch (error) {
      console.error("Error while saving vehicle repairs: ", error);
    }
  };

  const deleteVehicleRepair = async (repairUuid: string) => {
    try {
      const reponse = await fetch(`${API_BASE_URL}/repairs/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ repairUuid: repairUuid }),
      });

      const data = await reponse.json();

      if (data.success) {
        return true;
      }
      console.log("Error deleting vehicle repair: ", data.message);
      return false;
    } catch (error) {
      console.error("Error while deleting vehicle repair: ", error);
    }
  };

  const updateVehicleRepair = async (repairData: RepairData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/repairs/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          repairData: repairData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        return true;
      }
      console.log("Error updating vehicle repair: ", data.message);
      return false;
    } catch (error) {
      console.error("Error while updating vehicle repair: ", error);
    }
  };

  return {
    currentRepairFocus,
    setCurrentRepairFocus,
    getVehicleRepairs,
    saveVehicleRepairs,
    deleteVehicleRepair,
    updateVehicleRepair,
  };
}

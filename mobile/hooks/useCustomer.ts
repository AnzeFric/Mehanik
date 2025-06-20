import useAuthStore from "@/stores/useAuthStore";
import { API_BASE_URL } from "@/constants/Config";
import { CustomerData, CustomerVehicleData } from "@/interfaces/customer";
import { VehicleData } from "@/interfaces/vehicle";
import useCustomerStore from "@/stores/useCustomerStore";
import { RepairData } from "@/interfaces/repair";

export function useCustomer() {
  const { jwt } = useAuthStore();
  const { customers, setCustomers } = useCustomerStore();

  const saveCustomerVehicleRepair = async (
    customerData: CustomerData,
    vehicleData: VehicleData,
    repairData: RepairData | null
  ) => {
    try {
      let repairDataCheck = repairData;
      if (repairData?.type === "other" && repairData.description === "") {
        repairDataCheck = null;
      }

      let body = {
        customerData,
        vehicleData,
        ...(repairDataCheck && { repairData }),
      };

      const response = await fetch(`${API_BASE_URL}/customers/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        await updateStoredCustomerData(data.customers);
        return true;
      }
      console.log(
        "Error saving customer, vehicle and optional repair: ",
        data.message
      );
      return false;
    } catch (error) {
      console.error(
        "Error while saving mechanic customer, vehicle and optional repair: ",
        error
      );
    }
  };

  const updateCustomerVehicle = async (
    customerData: CustomerData,
    vehicleData: VehicleData
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          customerData,
          vehicleData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await updateStoredCustomerData(data.customers);
        return true;
      }
      console.log("Error updating customer and vehicle: ", data.message);
      return false;
    } catch (error) {
      console.error(
        "Error while updating mechanic customer and vehicle: ",
        error
      );
    }
  };

  const deleteCustomer = async (customerUuid: string | undefined | null) => {
    try {
      if (!customerUuid) {
        console.log("Error deleting customer, bad uuid: ", customerUuid);
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/customers/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ customerUuid: customerUuid }),
      });

      const data = await response.json();

      if (data.success) {
        await updateStoredCustomerData(data.customers);
        return true;
      }
      console.log("Error deleting customer: ", data.message);
      return false;
    } catch (error) {
      console.error("Error while deleting mechanic customer: ", error);
    }
  };

  const getMechanicCustomers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });

      const data = await response.json();
      if (data.success) {
        return data.customers;
      }
      console.log("Error fetching mechanic customers: ", data.message);
      return [];
    } catch (error) {
      console.error("Error while fetching mechanic customers: ", error);
    }
  };

  const updateStoredCustomerData = async (
    customers?: Array<CustomerVehicleData>
  ) => {
    if (!customers) customers = await getMechanicCustomers();

    let tempCustomers: Array<CustomerVehicleData> = [];
    customers?.forEach((item: any) => {
      let customer: CustomerData = {
        uuid: item.uuid,
        email: item.email,
        firstName: item.firstName,
        lastName: item.lastName,
        phone: item.phone,
      };

      item.vehicles.forEach((customerVehicle: any) => {
        let vehicle: VehicleData = {
          uuid: customerVehicle.uuid,
          brand: customerVehicle.brand,
          model: customerVehicle.model,
          buildYear: customerVehicle.buildYear,
          vin: customerVehicle.vin,
          image: customerVehicle.image,
          description: customerVehicle.description,
        };
        tempCustomers.push({ customer, vehicle });
      });
    });
    setCustomers(tempCustomers);
  };

  return {
    customers,
    saveCustomerVehicleRepair,
    updateCustomerVehicle,
    deleteCustomer,
    updateStoredCustomerData,
  };
}

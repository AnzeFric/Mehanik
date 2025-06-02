import useAuthStore from "@/stores/useAuthStore";
import { API_BASE_URL } from "@/constants/Config";
import {
  CustomerData,
  VehicleData,
  CustomerVehicleData,
} from "@/interfaces/customer";
import useCustomerStore from "@/stores/useCustomerStore";
import { RepairData } from "@/interfaces/repair";

export function useCustomer() {
  const { jwt } = useAuthStore();
  const { customers, setCustomers } = useCustomerStore();

  const saveCustomer = async (
    customerData: CustomerData,
    vehicleData: VehicleData,
    repairData: RepairData | null
  ) => {
    let repairDataCheck = repairData;
    if (repairData?.type === "other" && repairData.description === "") {
      repairDataCheck = null;
    }

    let body = {
      customerData,
      vehicleData,
      ...(repairDataCheck && { repairData }),
    };

    try {
      await fetch(`${API_BASE_URL}/customers/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify(body),
      });

      await updateStoredCustomerData();
    } catch (error) {
      console.error("Error while saving mechanic customer");
    }
  };

  const getMehcanicCustomers = async () => {
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

  const updateStoredCustomerData = async () => {
    const customers = await getMehcanicCustomers();
    if (customers.length <= 0) return;

    let tempCustomers: Array<CustomerVehicleData> = [];
    customers.forEach((item: any) => {
      let customer: CustomerData = {
        email: item.email,
        firstName: item.firstName,
        lastName: item.lastName,
        phone: item.phone,
        image: item.image,
      };

      item.vehicles.forEach((customerVehicle: any) => {
        let vehicle: VehicleData = {
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
    saveCustomer,
    updateStoredCustomerData,
  };
}

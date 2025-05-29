import useAuthStore from "@/stores/useAuthStore";
import { API_BASE_URL } from "@/constants/Config";
import useRepairStore from "@/stores/useRepairStore";
import { CustomerData } from "@/interfaces/mechanic";

export function useRepair() {
  const { jwt } = useAuthStore();
  const { customers, repairs, setCustomers, setRepairs } = useRepairStore();

  const getMechanicRelatedRepairs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/repairs/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });

      const data = await response.json();
      if (data.success) {
        return data.repairs;
      }
      console.log("Error fetching mechanic repairs: ", data.message);
      return [];
    } catch (error) {
      console.error("Error while fetching mechanic repairs: ", error);
    }
  };

  const updateStoredRepairData = async () => {
    const dataArr = await getMechanicRelatedRepairs();
    if (dataArr.length <= 0) return;

    let tempCustomers: Array<CustomerData> = [];
    // Get customers from data
    dataArr.forEach((item: any) => {
      let customer: CustomerData = {
        email: item.owner.email,
        firstName: item.owner.firstName,
        lastName: item.owner.lastName,
        image: item.image,
        brand: item.brand,
        model: item.model,
        buildYear: item.buildYear,
        vin: item.vin,
      };
      tempCustomers.push(customer);
    });
    setCustomers(tempCustomers);
  };

  return { customers, repairs, updateStoredRepairData };
}

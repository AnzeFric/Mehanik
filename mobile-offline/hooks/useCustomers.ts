import { database } from "@/database/index";
import Customer from "@/database/models/Customer";
import { CustomerFormData } from "@/interfaces/customer";

export function useCustomers() {
  const fetchCustomers = async () => {
    try {
      const customerRecords = await database
        .get<Customer>("customers")
        .query()
        .fetch();

      const customerData: CustomerFormData[] = await Promise.all(
        customerRecords.map(async (customerRecord) => {
          // Fetch the customer's vehicles
          const vehicleRecords = await customerRecord.vehicles.fetch();
          const repairRecords = await customerRecord.repairs.fetch();

          // First and only vehicle
          const primaryVehicle = vehicleRecords[0];

          const customer: CustomerFormData = {
            customer: {
              uuid: customerRecord.uuid,
              firstName: customerRecord.firstName,
              lastName: customerRecord.lastName,
              email: customerRecord.email,
              phone: customerRecord.phone,
            },
            vehicle: primaryVehicle
              ? {
                  brand: primaryVehicle.brand,
                  model: primaryVehicle.model,
                  buildYear: primaryVehicle.buildYear,
                  vin: primaryVehicle.vin,
                  image: primaryVehicle.image,
                  description: primaryVehicle.description,
                  customerId: primaryVehicle.customerId,
                }
              : {
                  brand: "",
                  model: "",
                  buildYear: null,
                  vin: null,
                  image: null,
                  description: null,
                  customerId: customerRecord.id,
                },
            repairs: repairRecords.map((repair) => ({
              uuid: repair.uuid,
              type: repair.type,
              price: repair.price,
              repairDate: repair.repairDate,
              options: repair.options,
              description: repair.description,
              images: repair.images,
              note: repair.note,
              customerId: repair.customerId,
            })),
          };

          return customer;
        })
      );

      return customerData;
    } catch (error) {
      console.error("Error while fetching customers: ", error);
    }
  };

  const deleteCustomer = async (customerUuid: string) => {};

  return {
    fetchCustomers,
    deleteCustomer,
  };
}

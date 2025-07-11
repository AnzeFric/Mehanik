import { database } from "@/database/index";
import Customer from "@/database/models/Customer";
import { CustomerData, CustomerFormData } from "@/interfaces/customer";
import { VehicleData } from "@/interfaces/vehicle";
import { Q } from "@nozbe/watermelondb";

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

  const deleteCustomer = async (customerUuid: string) => {
    try {
      const customerRecord = await database
        .get<Customer>("customers")
        .query(Q.where("uuid", customerUuid))
        .fetch();

      if (customerRecord.length === 0) {
        throw new Error(`Customer with UUID ${customerUuid} not found`);
      }

      const customer = customerRecord[0];

      // Delete in a transaction to ensure data consistency
      await database.write(async () => {
        const repairRecords = await customer.repairs.fetch();
        for (const repair of repairRecords) {
          await repair.destroyPermanently();
        }

        const vehicleRecords = await customer.vehicles.fetch();
        for (const vehicle of vehicleRecords) {
          await vehicle.destroyPermanently();
        }

        await customer.destroyPermanently();
      });

      return true;
    } catch (error) {
      console.error("Error while deleting customer: ", error);
      throw error;
    }
  };

  const updateCustomer = async (
    customerUuid: string,
    customerData: CustomerData,
    vehicleData: VehicleData
  ) => {
    try {
      // Find the customer by UUID
      const customerRecords = await database
        .get<Customer>("customers")
        .query(Q.where("uuid", customerUuid))
        .fetch();

      if (customerRecords.length === 0) {
        throw new Error(`Customer with UUID ${customerUuid} not found`);
      }

      const customer = customerRecords[0];

      // Update in a transaction to ensure data consistency
      await database.write(async () => {
        await customer.update((customerRecord) => {
          customerRecord.firstName = customerData.firstName;
          customerRecord.lastName = customerData.lastName;
          customerRecord.email = customerData.email;
          customerRecord.phone = customerData.phone;
        });

        // Update vehicle record if it exists
        const vehicleRecords = await customer.vehicles.fetch();

        if (vehicleRecords.length > 0) {
          const vehicle = vehicleRecords[0];
          await vehicle.update((vehicleRecord) => {
            vehicleRecord.brand = vehicleData.brand;
            vehicleRecord.model = vehicleData.model;
            vehicleRecord.buildYear = vehicleData.buildYear;
            vehicleRecord.vin = vehicleData.vin;
            vehicleRecord.image = vehicleData.image;
            vehicleRecord.description = vehicleData.description;
          });
        }
      });

      return true;
    } catch (error) {
      console.error("Error while updating customer: ", error);
      throw error;
    }
  };

  return {
    fetchCustomers,
    deleteCustomer,
    updateCustomer,
  };
}

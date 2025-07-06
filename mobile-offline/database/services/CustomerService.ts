import { database } from "@/database/index";
import Customer from "@/database/models/Customer";
import Vehicle from "@/database/models/Vehicle";
import Repair from "@/database/models/Repair";
import { CustomerData } from "@/interfaces/customer";
import { VehicleData } from "@/interfaces/vehicle";
import { RepairData } from "@/interfaces/repair";
import { Q } from "@nozbe/watermelondb";

export class CustomerService {
  static async createCustomer(
    customerData: CustomerData,
    vehicleData: VehicleData
  ): Promise<string> {
    return await database.write(async () => {
      const customer = await database
        .get<Customer>("customers")
        .create((customer) => {
          customer.uuid = customerData.uuid;
          customer.firstName = customerData.firstName;
          customer.lastName = customerData.lastName;
          customer.email = customerData.email;
          customer.phone = customerData.phone;
        });

      await database.get<Vehicle>("vehicles").create((vehicle) => {
        vehicle.brand = vehicleData.brand;
        vehicle.model = vehicleData.model;
        vehicle.buildYear = vehicleData.buildYear;
        vehicle.vin = vehicleData.vin;
        vehicle.image = vehicleData.image;
        vehicle.description = vehicleData.description;
        vehicle.customerId = customer.id;
      });

      return customer.id;
    });
  }

  static async updateCustomer(
    customerId: string,
    customerData: Partial<CustomerData>
  ): Promise<void> {
    await database.write(async () => {
      const customer = await database
        .get<Customer>("customers")
        .find(customerId);
      await customer.update((customer) => {
        if (customerData.firstName !== undefined)
          customer.firstName = customerData.firstName;
        if (customerData.lastName !== undefined)
          customer.lastName = customerData.lastName;
        if (customerData.email !== undefined)
          customer.email = customerData.email;
        if (customerData.phone !== undefined)
          customer.phone = customerData.phone;
      });
    });
  }

  static async deleteCustomer(customerId: string): Promise<void> {
    await database.write(async () => {
      const customer = await database
        .get<Customer>("customers")
        .find(customerId);

      // Delete associated vehicles and repairs
      const vehicles = await customer.vehicles.fetch();
      const repairs = await customer.repairs.fetch();

      await Promise.all([
        ...vehicles.map((vehicle) => vehicle.destroyPermanently()),
        ...repairs.map((repair) => repair.destroyPermanently()),
      ]);

      await customer.destroyPermanently();
    });
  }

  static async addRepair(repairData: RepairData): Promise<string> {
    return await database.write(async () => {
      const repair = await database.get<Repair>("repairs").create((repair) => {
        repair.uuid = repairData.uuid;
        repair.type = repairData.type;
        repair.price = repairData.price;
        repair.repairDate = repairData.repairDate;
        repair.options = repairData.options;
        repair.description = repairData.description;
        repair.images = repairData.images;
        repair.note = repairData.note;
        repair.customerId = repairData.customerId;
      });

      return repair.id;
    });
  }

  static async searchCustomers(query: string): Promise<Customer[]> {
    return await database
      .get<Customer>("customers")
      .query(
        Q.or(
          Q.where("first_name", Q.like(`%${query}%`)),
          Q.where("last_name", Q.like(`%${query}%`)),
          Q.where("email", Q.like(`%${query}%`)),
          Q.where("phone", Q.like(`%${query}%`))
        )
      )
      .fetch();
  }
}

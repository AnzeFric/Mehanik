import { database } from "@/database/index";
import Customer from "@/database/models/Customer";
import Repair from "@/database/models/Repair";
import { Q } from "@nozbe/watermelondb";
import { RepairData } from "@/interfaces/repair";
import uuid from "react-native-uuid";

export function useRepairs() {
  const addRepair = async (customerUuid: string, repairData: RepairData) => {
    try {
      const customerRecords = await database
        .get<Customer>("customers")
        .query(Q.where("uuid", customerUuid))
        .fetch();

      if (customerRecords.length === 0) {
        throw new Error(`Customer with UUID ${customerUuid} not found`);
      }

      const customer = customerRecords[0];

      await database.write(async () => {
        return await database.get<Repair>("repairs").create((repair) => {
          repair.uuid = uuid.v4();
          repair.type = repairData.type;
          repair.kilometers = repairData.kilometers;
          repair.price = repairData.price;
          repair.repairDate = repairData.repairDate;
          repair.options = repairData.options;
          repair.description = repairData.description || "";
          repair.images = repairData.images || [];
          repair.note = repairData.note || "";
          repair.customerId = customer.id;
        });
      });

      return true;
    } catch (error) {
      console.error("Error while adding repair: ", error);
      throw error;
    }
  };

  const editRepair = async (repairData: RepairData) => {
    try {
      const repairRecords = await database
        .get<Repair>("repairs")
        .query(Q.where("uuid", repairData.uuid))
        .fetch();

      if (repairRecords.length === 0) {
        throw new Error(`Repair with UUID ${repairData.uuid} not found`);
      }

      const repair = repairRecords[0];

      await database.write(async () => {
        await repair.update((repairRecord) => {
          repairRecord.type = repairData.type;
          repairRecord.kilometers = repairData.kilometers;
          repairRecord.price = repairData.price;
          repairRecord.repairDate = repairData.repairDate;
          repairRecord.options = repairData.options;
          repairRecord.description = repairData.description || "";
          repairRecord.images = repairData.images || [];
          repairRecord.note = repairData.note || "";
        });
      });

      return true;
    } catch (error) {
      console.error("Error while editing repair: ", error);
      throw error;
    }
  };

  const deleteRepair = async (repairUuid: string) => {
    try {
      const repairRecords = await database
        .get<Repair>("repairs")
        .query(Q.where("uuid", repairUuid))
        .fetch();

      if (repairRecords.length === 0) {
        throw new Error(`Repair with UUID ${repairUuid} not found`);
      }

      const repair = repairRecords[0];

      await database.write(async () => {
        await repair.destroyPermanently();
      });

      return true;
    } catch (error) {
      console.error("Error while deleting repair: ", error);
      throw error;
    }
  };

  const getRepairsByCustomer = async (customerUuid: string) => {
    try {
      const customerRecords = await database
        .get<Customer>("customers")
        .query(Q.where("uuid", customerUuid))
        .fetch();

      if (customerRecords.length === 0) {
        throw new Error(`Customer with UUID ${customerUuid} not found`);
      }

      const customer = customerRecords[0];

      const repairs = await customer.repairs.fetch();

      return repairs.map((repair) => ({
        uuid: repair.uuid,
        type: repair.type,
        kilometers: repair.kilometers,
        price: repair.price,
        repairDate: repair.repairDate,
        options: repair.options,
        description: repair.description,
        images: repair.images,
        note: repair.note,
        customerId: repair.customerId,
      }));
    } catch (error) {
      console.error("Error while fetching repairs: ", error);
      throw error;
    }
  };

  const getRepairByUuid = async (repairUuid: string) => {
    try {
      const repairRecords = await database
        .get<Repair>("repairs")
        .query(Q.where("uuid", repairUuid))
        .fetch();

      if (repairRecords.length === 0) {
        throw new Error(`Repair with UUID ${repairUuid} not found`);
      }

      const repair = repairRecords[0];

      return {
        uuid: repair.uuid,
        type: repair.type,
        kilometers: repair.kilometers,
        price: repair.price,
        repairDate: repair.repairDate,
        options: repair.options,
        description: repair.description,
        images: repair.images,
        note: repair.note,
        customerId: repair.customerId,
      };
    } catch (error) {
      console.error("Error while fetching repair: ", error);
      throw error;
    }
  };

  return {
    addRepair,
    editRepair,
    deleteRepair,
    getRepairsByCustomer,
    getRepairByUuid,
  };
}

import { database } from "@/database/index";
import Customer from "@/database/models/Customer";
import Repair from "@/database/models/Repair";
import { Q } from "@nozbe/watermelondb";
import { useCallback } from "react";

export interface RepairData {
  type: string;
  price: number;
  repairDate: Date;
  options: RepairOptions;
  description?: string;
  images?: string[];
  note?: string;
}

export interface RepairOptions {
  oilChange: boolean;
  filterChange: boolean;
  brakeCheck: boolean;
  tireRotation: boolean;
  fluidCheck: boolean;
  batteryCheck: boolean;
  sparkPlugs: boolean;
  airFilter: boolean;
  cabinFilter: boolean;
  suspension: boolean;
  timing: boolean;
  coolant: boolean;
}

export function useRepairs() {
  const addRepair = useCallback(
    async (customerUuid: string, repairData: RepairData) => {
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

        // Create new repair record
        const newRepair = await database.write(async () => {
          return await database.get<Repair>("repairs").create((repair) => {
            repair.uuid = `repair_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            repair.type = repairData.type;
            repair.price = repairData.price;
            repair.repairDate = repairData.repairDate;
            repair.options = repairData.options;
            repair.description = repairData.description || "";
            repair.images = repairData.images || [];
            repair.note = repairData.note || "";
            repair.customerId = customer.id;
          });
        });

        console.log(`Repair added successfully for customer ${customerUuid}`);
        return newRepair;
      } catch (error) {
        console.error("Error while adding repair: ", error);
        throw error;
      }
    },
    []
  );

  const editRepair = useCallback(
    async (
      customerUuid: string,
      repairUuid: string,
      repairData: RepairData
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

        // Find the repair by UUID
        const repairRecords = await database
          .get<Repair>("repairs")
          .query(Q.where("uuid", repairUuid))
          .fetch();

        if (repairRecords.length === 0) {
          throw new Error(`Repair with UUID ${repairUuid} not found`);
        }

        const repair = repairRecords[0];

        // Update repair record
        await database.write(async () => {
          await repair.update((repairRecord) => {
            repairRecord.type = repairData.type;
            repairRecord.price = repairData.price;
            repairRecord.repairDate = repairData.repairDate;
            repairRecord.options = repairData.options;
            repairRecord.description = repairData.description || "";
            repairRecord.images = repairData.images || [];
            repairRecord.note = repairData.note || "";
          });
        });

        console.log(`Repair ${repairUuid} updated successfully`);
        return true;
      } catch (error) {
        console.error("Error while editing repair: ", error);
        throw error;
      }
    },
    []
  );

  const deleteRepair = useCallback(
    async (customerUuid: string, repairUuid: string) => {
      try {
        // Find the customer by UUID (for validation)
        const customerRecords = await database
          .get<Customer>("customers")
          .query(Q.where("uuid", customerUuid))
          .fetch();

        if (customerRecords.length === 0) {
          throw new Error(`Customer with UUID ${customerUuid} not found`);
        }

        // Find the repair by UUID
        const repairRecords = await database
          .get<Repair>("repairs")
          .query(Q.where("uuid", repairUuid))
          .fetch();

        if (repairRecords.length === 0) {
          throw new Error(`Repair with UUID ${repairUuid} not found`);
        }

        const repair = repairRecords[0];

        // Delete repair record
        await database.write(async () => {
          await repair.destroyPermanently();
        });

        console.log(`Repair ${repairUuid} deleted successfully`);
        return true;
      } catch (error) {
        console.error("Error while deleting repair: ", error);
        throw error;
      }
    },
    []
  );

  const getRepairsByCustomer = useCallback(async (customerUuid: string) => {
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

      // Get all repairs for this customer
      const repairs = await customer.repairs.fetch();

      return repairs.map((repair) => ({
        uuid: repair.uuid,
        type: repair.type,
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
  }, []);

  const getRepairById = useCallback(async (repairUuid: string) => {
    try {
      // Find the repair by UUID
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
  }, []);

  return {
    addRepair,
    editRepair,
    deleteRepair,
    getRepairsByCustomer,
    getRepairById,
  };
}

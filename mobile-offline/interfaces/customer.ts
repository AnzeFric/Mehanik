import { RepairData } from "./repair";
import { VehicleData } from "./vehicle";

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
}

export interface CustomerFormData {
  id: number;
  customer: CustomerData;
  vehicle: VehicleData;
  repair: Array<RepairData> | null;
}

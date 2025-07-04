import { RepairData } from "./repair";
import { VehicleData } from "./vehicle";

export interface CustomerData {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
}

export interface CustomerVehicleData {
  customer: CustomerData;
  vehicle: VehicleData;
}

export interface CustomerFormData {
  customer: CustomerData;
  vehicle: VehicleData;
  repair: RepairData | null;
}

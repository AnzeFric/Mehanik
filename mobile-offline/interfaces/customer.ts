import { RepairData } from "./repair";
import { VehicleData } from "./vehicle";

export interface CustomerData {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
}

export interface CustomerFormData {
  customer: CustomerData;
  vehicle: VehicleData;
  repairs?: RepairData[];
}

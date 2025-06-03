import { RepairData } from "./repair";

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
}

export interface VehicleData {
  brand: string;
  model: string;
  buildYear: number | null;
  vin: string;
  image: string | null;
  description: string | null;
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

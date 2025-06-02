export interface CustomerData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
}

export interface VehicleData {
  brand: string;
  model: string;
  buildYear: number;
  vin: string;
  image: string | null;
  description: string | null;
}

export interface CustomerVehicleData {
  customer: CustomerData;
  vehicle: VehicleData;
}

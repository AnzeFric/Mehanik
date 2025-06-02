export interface ServiceFormData {
  id: number;
  // Customer info
  imageUri?: string;
  firstName: string;
  lastName: string;
  address?: string;
  phoneNumber?: string;
  email?: string;

  // Vehicle info
  carBrand: string;
  carModel: string;
  carYear?: string;
  vin?: string;
  carDescription?: string;

  // Service info
  serviceType: "small" | "large" | "other";
  date: Date;
  serviceItems?: {
    oilChange?: boolean;
    filterChange?: boolean;
    brakeCheck?: boolean;
    tireRotation?: boolean;
    fluidCheck?: boolean;
    batteryCheck?: boolean;
    sparkPlugs?: boolean;
    airFilter?: boolean;
    cabinFilter?: boolean;
    suspension?: boolean;
    timing?: boolean;
    coolant?: boolean;
  };
  serviceNotes?: string;
  serviceImages?: string[];
  servicePrice?: string;

  // Custom service (type is "other")
  customServiceDescription?: string;
}

export interface CustomerData {
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  brand: string;
  model: string;
  buildYear: number;
  vin: string;
  description: string;
}

export interface VehicleData {
  id: number;
  carBrand: string;
  carModel: string;
  carYear?: string;
  vin?: string;
  carDescription?: string;
}

export interface ServiceData {
  id: number;
  type: "small" | "large" | "other";
  date: Date;
  options?: {
    oilChange?: boolean;
    filterChange?: boolean;
    brakeCheck?: boolean;
    tireRotation?: boolean;
    fluidCheck?: boolean;
    batteryCheck?: boolean;
    sparkPlugs?: boolean;
    airFilter?: boolean;
    cabinFilter?: boolean;
    suspension?: boolean;
    timing?: boolean;
    coolant?: boolean;
  };
  message?: string;
  images?: string[];
  price?: number;

  // Custom service (type is "other")
  customServiceDescription?: string;
}

export interface AppointmentData {
  id: number;
  name: string;
  vehicle: string;
  dateTime: Date;
  description: string;
}

// New data formats
export interface CustomerData2 {
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
}

export interface VehicleData2 {
  brand: string;
  model: string;
  buildYear: number;
  vin: string;
  image: string | null;
  description: string | null;
}

export interface CustomerVehicleData {
  customer: CustomerData2;
  vehicle: VehicleData2;
}

export interface RepairData2 {
  type: "small" | "large" | "other";
  price: number | null;
  date: Date;
  options: RepairOptions;
  message: string | null;
  images: string | null;
}

export interface RepairOptions {
  oilChange: boolean | null;
  filterChange: boolean | null;
  brakeCheck: boolean | null;
  tireRotation: boolean | null;
  fluidCheck: boolean | null;
  batteryCheck: boolean | null;
  sparkPlugs: boolean | null;
  airFilter: boolean | null;
  cabinFilter: boolean | null;
  suspension: boolean | null;
  timing: boolean | null;
  coolant: boolean | null;
}

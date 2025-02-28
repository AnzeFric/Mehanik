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
  id: number;
  name: string;
  image: string;
  vehicle: string;
  year: number;
  vin: string;
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
  servicePrice?: number;

  // Custom service (type is "other")
  customServiceDescription?: string;
}

export interface AppointmentData {
  id: number;
  name: string;
  vehicle: string;
  date: Date;
  description: string;
}

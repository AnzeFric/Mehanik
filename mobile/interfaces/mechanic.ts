export interface ServiceData {
  id: number;
  date: Date;
  serviceType: "small" | "large" | "other";
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

export interface AppointmentData {
  id: number;
  name: string;
  vehicle: string;
  day: Date;
  description: string;
}

export interface CustomerData {
  id: number;
  name: string;
  image: string;
  vehicle: string;
  year: number;
  vin: string;
}

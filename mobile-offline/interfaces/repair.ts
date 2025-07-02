export interface RepairData {
  uuid: string;
  type: RepairType;
  price: number | null;
  date: Date;
  options: RepairOptions;
  description: string | null; // For "other" repair type
  images: string[] | null;
  note: string | null; // Note used in all types
}

export type RepairType = "small" | "large" | "other";

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

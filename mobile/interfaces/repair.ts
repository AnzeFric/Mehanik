export interface RepairData {
  uuid: string;
  type: "small" | "large" | "other";
  price: number | null;
  date: Date;
  options: RepairOptions;
  description: string | null; // For "other" service type
  images: string[] | null;
  note: string | null; // Note used in all types
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

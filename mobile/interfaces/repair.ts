export interface RepairData {
  type: "small" | "large" | "other";
  price: number | null;
  date: Date;
  options: RepairOptions;
  description: string | null; // For "other" service type
  images: string | null;
  note: string | null; // Note used in all types
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

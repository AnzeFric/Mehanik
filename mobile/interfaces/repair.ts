export interface RepairData {
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

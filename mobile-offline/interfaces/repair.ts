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

export interface RepairData {
  uuid: string;
  type: RepairType;
  price: number | null;
  repairDate: Date;
  options: RepairOptions;
  description: string | null;
  images: Array<string>;
  note: string | null;
  customerId: string;
}

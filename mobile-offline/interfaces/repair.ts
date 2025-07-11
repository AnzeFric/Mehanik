export type RepairType = "small" | "large" | "other";

export interface RepairOptions {
  oilChange: boolean;
  filterChange: boolean;
  airFilter: boolean;
  cabinFilter: boolean;
  frontBrakes: boolean;
  backBrakes: boolean;
  batteryCheck: boolean;
  brakeFluid: boolean;

  // large
  coolant: boolean;
  sparkPlugs: boolean;
  outerTiming: boolean;
  timingChain: boolean;
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

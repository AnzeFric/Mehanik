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
  outerTiming: boolean; // Zunanji jermen
  outerTimingComplete: boolean; // Zunanji jermen komplet
  timingChain: boolean; // Zobati jermen/Veriga kpl.
  transmissionFluid: boolean;
  transmissionFilter: boolean;
  gearFluid: boolean;
  waterPump: boolean;
}

export interface RepairData {
  uuid: string;
  type: RepairType;
  kilometers: number | null;
  price: number | null;
  repairDate: Date;
  options: RepairOptions;
  description: string | null;
  images: Array<string>;
  note: string | null;
  customerId: string;
}

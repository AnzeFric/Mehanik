import { Model, Relation } from "@nozbe/watermelondb";
import { field, date, relation, json } from "@nozbe/watermelondb/decorators";
import { RepairOptions, RepairType } from "@/interfaces/repair";
import Customer from "./Customer";

const sanitizeRepairOptions = (obj: RepairOptions) =>
  obj || {
    oilChange: false,
    filterChange: false,
    airFilter: false,
    cabinFilter: false,
    frontBrakes: false,
    backBrakes: false,
    batteryCheck: false,
    brakeFluid: false,

    // large
    coolant: false,
    sparkPlugs: false,
    outerTiming: false,
    timingChain: false,
  };

const sanitizeImages = (arr: Array<string>) => arr || [];

export default class Repair extends Model {
  static table = "repairs";

  static associations = {
    customer: { type: "belongs_to" as const, key: "customer_id" },
  };

  @field("uuid") uuid!: string;
  @field("type") type!: RepairType;
  @field("kilometers") kilometers!: number | null;
  @field("price") price!: number | null;
  @date("repair_date") repairDate!: Date;
  @json("options", sanitizeRepairOptions) options!: RepairOptions;
  @field("description") description!: string | null;
  @json("images", sanitizeImages) images!: Array<string>;
  @field("note") note!: string | null;
  @field("customer_id") customerId!: string;

  @relation("customers", "customer_id") customer!: Relation<Customer>;
}

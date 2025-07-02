import { Model, Relation } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import Customer from "./Customer";

export default class Vehicle extends Model {
  static table = "vehicles";

  static associations = {
    customer: { type: "belongs_to" as const, key: "customer_id" },
  };

  @field("brand") brand!: string;
  @field("model") model!: string;
  @field("build_year") buildYear!: number | null;
  @field("vin") vin!: string | null;
  @field("image") image!: string | null;
  @field("description") description!: string | null;
  @field("customer_id") customerId!: string;
  @relation("customers", "customer_id") customer!: Relation<Customer>;
}

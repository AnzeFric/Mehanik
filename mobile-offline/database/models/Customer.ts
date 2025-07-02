import { Model, Query } from "@nozbe/watermelondb";
import { field, children, relation } from "@nozbe/watermelondb/decorators";
import Vehicle from "./Vehicle";
import Repair from "./Repair";

export default class Customer extends Model {
  static table = "customers";

  static associations = {
    vehicle: { type: "belongs_to" as const, key: "customer_id" },
    repairs: { type: "has_many" as const, foreignKey: "customer_id" },
  };

  @field("uuid") uuid!: string;
  @field("first_name") firstName!: string;
  @field("last_name") lastName!: string;
  @field("email") email!: string | null;
  @field("phone") phone!: string | null;

  @relation("vehicles", "customer_id") vehicle!: Vehicle;
  @children("repairs") repairs!: Query<Repair>;
}

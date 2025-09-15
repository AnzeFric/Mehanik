import { Model, Query } from "@nozbe/watermelondb";
import { field, children } from "@nozbe/watermelondb/decorators";
import Vehicle from "./Vehicle";
import Repair from "./Repair";

export default class Customer extends Model {
  static table = "customers";

  static associations = {
    vehicles: { type: "has_many" as const, foreignKey: "customer_id" },
    repairs: { type: "has_many" as const, foreignKey: "customer_id" },
  };

  @field("uuid") uuid!: string;
  @field("first_name") firstName!: string;
  @field("last_name") lastName!: string;
  @field("email") email!: string | null;
  @field("phone") phone!: string | null;

  @children("vehicles") vehicles!: Query<Vehicle>;
  @children("repairs") repairs!: Query<Repair>;
}

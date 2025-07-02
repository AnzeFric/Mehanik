import { Model } from "@nozbe/watermelondb";
import field from "@nozbe/watermelondb/decorators/field";

export default class Customer extends Model {
  static table = "customers";

  static associations = {
    vehicles: { type: "has_many" as const, foreignKey: "fk_customer" },
    repairs: { type: "has_many" as const, foreignKey: "fk_customer" },
  };

  @field("uuid") uuid!: string;
  @field("first_name") firstName!: string;
  @field("last_name") lastName!: string;
  @field("email") email!: string | null;
  @field("phone") phone!: string | null;
}

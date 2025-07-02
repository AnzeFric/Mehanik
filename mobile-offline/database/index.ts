import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import schema from "./config/schema";
import migrations from "./config/migrations";
import Customer from "./models/Customer";
import Vehicle from "./models/Vehicle";
import Repair from "./models/Repair";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: "mehanik",
  jsi: true,
});

export const database = new Database({
  adapter,
  modelClasses: [Customer, Vehicle, Repair],
});

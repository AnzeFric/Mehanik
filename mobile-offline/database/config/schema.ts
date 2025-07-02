import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "customers",
      columns: [
        { name: "uuid", type: "string" },
        { name: "first_name", type: "string" },
        { name: "last_name", type: "string" },
        { name: "phone", type: "string", isOptional: true },
        { name: "email", type: "string", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "vehicles",
      columns: [
        { name: "brand", type: "string" },
        { name: "model", type: "string" },
        { name: "vin", type: "string", isOptional: true },
        { name: "build_year", type: "number", isOptional: true },
        { name: "image", type: "string", isOptional: true },
        { name: "description", type: "string", isOptional: true },
        { name: "customer_id", type: "string", isIndexed: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "repairs",
      columns: [
        { name: "uuid", type: "string" },
        { name: "type", type: "string" },
        { name: "price", type: "number", isOptional: true },
        { name: "repair_date", type: "number" },
        { name: "options", type: "string" }, // JSON string
        { name: "description", type: "string", isOptional: true },
        { name: "images", type: "string", isOptional: true }, // JSON string
        { name: "note", type: "string", isOptional: true },
        { name: "customer_id", type: "string", isIndexed: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});

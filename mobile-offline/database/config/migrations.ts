import {
  schemaMigrations,
  addColumns,
} from "@nozbe/watermelondb/Schema/migrations";

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        addColumns({
          table: "repairs",
          columns: [{ name: "kilometers", type: "number", isOptional: true }],
        }),
      ],
    },
  ],
});

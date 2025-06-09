const supabase = require("../config/database");

async function resetUpdatedAt(uuid, table) {
  const { error } = await supabase
    .from(table)
    .update({ updated_at: new Date().toISOString() })
    .eq("uuid", uuid);

  if (error)
    throw new Error(
      `Failed to reset updated_at timestamp for ${uuid}: ${error.message}`
    );
}

module.exports = { resetUpdatedAt };

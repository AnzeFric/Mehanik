const supabase = require("../../config/database");
const mechanicService = require("./mechanic");

const userService = {
  async getUserByUuidAndEnabled(uuid) {
    const { data, error } = await supabase
      .from("users")
      .select("email, first_name, last_name, account_type")
      .eq("uuid", uuid)
      .eq("enabled", true)
      .maybeSingle();

    if (error)
      throw new Error(`(Fetch enabled user) Database error: ${error.message}`);
    if (!data) throw new Error("User not found");

    return data;
  },

  async getMechanicByUserUuidAndEnabled(userUuid) {
    const { data, error } = await supabase
      .from("users")
      .select(
        "email, first_name, last_name, account_type, mechanics(phone, address, city, prices, image)"
      )
      .eq("uuid", userUuid)
      .eq("enabled", true)
      .maybeSingle();

    if (error)
      throw new Error(
        `(Fetch enabled user mechanic - userUuid) Database error: ${error.message}`
      );
    if (!data) throw new Error("Mechanic not found");

    return data;
  },

  async getMechanicByEmailAndEnabled(email) {
    const { data, error } = await supabase
      .from("users")
      .select(
        "email, first_name, last_name, account_type, mechanics(uuid, phone, address, city, prices, image)"
      )
      .eq("email", email)
      .eq("enabled", true)
      .maybeSingle();

    if (error)
      throw new Error(
        `(Fetch enabled user mechanic - email) Database error: ${error.message}`
      );
    if (!data) throw new Error("Mechanic not found");

    return data;
  },

  async getEnabledMechanics() {
    const { data, error } = await supabase
      .from("users")
      .select(
        "email, first_name, last_name, mechanics(phone, address, city, prices, image)"
      )
      .eq("account_type", "mechanic")
      .eq("enabled", true);

    if (error)
      throw new Error(
        `(Fetch enabled user mechanics) Database error: ${error.message}`
      );
    if (!data) throw new Error("Mechanics not found");

    return data;
  },

  async updateUserByUuidAndEnabled(uuid, userData) {
    const { data, error } = await supabase
      .from("users")
      .update({
        ...userData,
        updated_at: new Date().toISOString(),
      })
      .eq("uuid", uuid)
      .eq("enabled", true)
      .select()
      .maybeSingle();

    if (error)
      throw new Error(`(Update user) Database error: ${error.message}`);
    if (!data) throw new Error("User not found");

    return true;
  },

  async disableByUuidAndEnabled(uuid) {
    const { data, error } = await supabase
      .from("users")
      .update({ enabled: false, updated_at: new Date().toISOString() })
      .eq("uuid", uuid)
      .eq("enabled", true)
      .select()
      .maybeSingle();

    if (error)
      throw new Error(`(Disable user) Database error: ${error.message}`);
    if (!data) throw new Error("User not found");

    await mechanicService.deleteMechanicByUserUuid(uuid);

    return true;
  },
};

module.exports = userService;

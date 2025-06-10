const supabase = require("../../config/database");
const { resetUpdatedAt } = require("../../utils/dbUtil");
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
      throw new Error(`Failed to fetch user ${uuid}: ${error.message}`);
    if (!data) throw new Error("User not found");

    return data;
  },

  async getMechanicByUuidAndEnabled(uuid) {
    const { data, error } = await supabase
      .from("users")
      .select(
        "email, first_name, last_name, account_type, mechanics(phone, address, city, prices)"
      )
      .eq("uuid", uuid)
      .eq("enabled", true)
      .maybeSingle();

    if (error)
      throw new Error(`Failed to fetch user ${uuid}: ${error.message}`);
    if (!data) throw new Error("User not found");

    return data;
  },

  async getEnabledMechanics() {
    const { data, error } = await supabase
      .from("users")
      .select(
        "email, first_name, last_name, mechanics(phone, address, city, prices)"
      )
      .eq("account_type", "mechanic")
      .eq("enabled", true);

    if (error) throw new Error(`Failed to fetch mechanics: ${error.message}`);
    if (!data) throw new Error("Mechanics not found");

    return data;
  },

  async updateByUuidAndEnabled(uuid, userData) {
    const { data, error } = await supabase
      .from("users")
      .update(userData)
      .eq("uuid", uuid)
      .eq("enabled", true)
      .select()
      .maybeSingle();

    if (error)
      throw new Error(`Failed to update user ${uuid}: ${error.message}`);
    if (!data) throw new Error("User not found");

    await resetUpdatedAt(uuid, "users");

    return true;
  },

  async disableByUuidAndEnabled(uuid) {
    const { data, error } = await supabase
      .from("users")
      .update({ enabled: false })
      .eq("uuid", uuid)
      .eq("enabled", true)
      .select()
      .maybeSingle();

    if (error)
      throw new Error(`Failed to disable user ${uuid}: ${error.message}`);
    if (!data) throw new Error("User not found");

    await mechanicService.delete(uuid);

    await resetUpdatedAt(uuid, "users");

    return true;
  },
};

module.exports = userService;

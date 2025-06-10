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
      throw new Error(`Failed to update user ${uuid}: ${error.message}`);
    if (!data) throw new Error("User not found");

    return true;
  },

  async updateMechanicByUuidAndEnabled(uuid, mechanicData) {
    const { data, error } = await supabase
      .from("mechanics")
      .update({
        ...mechanicData,
        updated_at: new Date().toISOString(),
      })
      .eq("uuid", uuid)
      .eq("enabled", true)
      .select()
      .maybeSingle();

    if (error)
      throw new Error(`Failed to update mechanic ${uuid}: ${error.message}`);
    if (!data) throw new Error("Mechanic not found");

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
      throw new Error(`Failed to disable user ${uuid}: ${error.message}`);
    if (!data) throw new Error("User not found");

    await mechanicService.delete(uuid);

    return true;
  },
};

module.exports = userService;

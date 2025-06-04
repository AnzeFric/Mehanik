const supabase = require("../../config/database");
const mechanicService = require("./mechanic");

const userService = {
  async getUserByEmailAndEnabled(email) {
    const { data, error } = await supabase
      .from("users")
      .select("uuid, email, first_name, last_name, account_type")
      .eq("email", email)
      .eq("enabled", true)
      .maybeSingle();

    if (error)
      throw new Error(`Failed to fetch user ${email}: ${error.message}`);
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

  async updateByEmailAndEnabled(email, userData) {
    const { data, error } = await supabase
      .from("users")
      .update(userData)
      .eq("email", email)
      .eq("enabled", true)
      .select()
      .maybeSingle();

    if (error)
      throw new Error(`Failed to update user ${email}: ${error.message}`);
    if (!data) throw new Error("User not found");

    await this.resetUpdatedAtTimestamp(email);

    return true;
  },

  async disableByEmailAndEnabled(email) {
    const { data, error } = await supabase
      .from("users")
      .update({ enabled: false })
      .eq("email", email)
      .eq("enabled", true)
      .select()
      .maybeSingle();

    if (error)
      throw new Error(`Failed to disable user ${email}: ${error.message}`);
    if (!data) throw new Error("User not found");

    await mechanicService.delete(data.uuid);

    await this.resetUpdatedAtTimestamp(email);

    return true;
  },

  async resetUpdatedAtTimestamp(email) {
    const { error } = await supabase
      .from("users")
      .update({ updated_at: new Date().toISOString() })
      .eq("email", email);

    if (error)
      throw new Error(
        `Failed to reset updated_at timestamp for user ${email}: ${error.message}`
      );
  },
};

module.exports = userService;

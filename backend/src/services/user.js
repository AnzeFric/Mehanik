const supabase = require("../config/database");

const userService = {
  async getUserByEmailAndEnabled(email) {
    const { data, error } = await supabase
      .from("users")
      .select("uuid, email, first_name, last_name, account_type")
      .eq("email", email)
      .eq("enabled", true)
      .maybeSingle();

    if (error) {
      throw new Error("Failed to fetch user");
    }

    if (!data) {
      throw new Error("User not found");
    }

    return data;
  },

  async disableByEmailAndEnabled(email) {
    const { data, error } = await supabase
      .from("users")
      .update({ enabled: false })
      .eq("email", email)
      .eq("enabled", true)
      .select()
      .maybeSingle();

    if (error) {
      throw new Error("Failed to disable user");
    }

    if (!data) {
      throw new Error("User not found");
    }
  },
};

module.exports = userService;

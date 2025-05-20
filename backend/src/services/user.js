const supabase = require("../config/database");

const userService = {
  async getUserByEmail(email) {
    const { data, error } = await supabase
      .from("users")
      .select("uuid, email, first_name, last_name")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      throw new Error("Failed to fetch user");
    }

    if (!data) {
      throw new Error("User not found");
    }

    return data;
  },

  async disableByEmail(email) {
    const { error } = await supabase
      .from("users")
      .update({ enabled: false })
      .eq("email", email)
      .select()
      .maybeSingle();

    if (error) {
      throw new Error("Failed to disable user");
    }
  },
};

module.exports = userService;

const supabase = require("../config/database");

const mechanicService = {
  async create(userUuid) {
    const { error } = await supabase.from("mechanics").insert({
      phone: null,
      address: null,
      prices: {
        largeService: null,
        smallService: null,
        tyreChange: null,
      },
      fk_user: userUuid,
    });

    if (error) throw error;

    return true;
  },

  async delete(userUuid) {
    const { error } = await supabase
      .from("mechanics")
      .delete()
      .eq("fk_user", userUuid);

    if (error) throw error;

    return true;
  },

  // Function is used to check if the user has an existing mechanic profile
  async check(userUuid) {
    const { data, error } = await supabase
      .from("mechanics")
      .select("*")
      .eq("fk_user", userUuid)
      .maybeSingle();

    if (error) throw error;

    return data;
  },
};

module.exports = mechanicService;

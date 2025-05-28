const supabase = require("../config/database");
const userService = require("./user");

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
  },

  async delete(userUuid) {
    const { error } = await supabase
      .from("mechanics")
      .delete()
      .eq("fk_user", userUuid);

    if (error) throw error;
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

  async getAll() {
    // First fetch users with mechanic account type and enabled
    const enabledMechanics = await userService.getEnabledMechanics();
    console.log("Mechanics service get all:");
    console.log(enabledMechanics, { depth: null });
    // Flatten the nested mechanics data
    const flattenedMechanics = enabledMechanics.map((user) => ({
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.mechanics[0]?.phone,
      address: user.mechanics[0]?.address,
      city: user.mechanics[0]?.city,
      prices: user.mechanics[0]?.prices,
    }));
    return flattenedMechanics;
  },
};

module.exports = mechanicService;

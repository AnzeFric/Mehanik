const supabase = require("../../config/database");
const { v4: uuidv4 } = require("uuid");

const mechanicService = {
  async saveMechanicByUserUuid(userUuid) {
    let uuid = uuidv4();

    const { error } = await supabase.from("mechanics").insert({
      uuid: uuid,
      phone: null,
      address: null,
      prices: {
        largeRepair: null,
        smallRepair: null,
        tyreChange: null,
      },
      work_hours: null,
      fk_user: userUuid,
    });

    if (error)
      throw new Error(`(Save mechanic) Database error: ${error.message}`);

    return true;
  },

  async deleteMechanicByUserUuid(userUuid) {
    const { error } = await supabase
      .from("mechanics")
      .delete()
      .eq("fk_user", userUuid);

    if (error)
      throw new Error(`(Delete mechanic) Database error: ${error.message}`);

    return true;
  },

  async updateMechanicByUuid(uuid, mechanicData) {
    const { data, error } = await supabase
      .from("mechanics")
      .update({
        ...mechanicData,
        updated_at: new Date().toISOString(),
      })
      .eq("uuid", uuid)
      .select()
      .maybeSingle();

    if (error)
      throw new Error(`(Update mechanic) Database error: ${error.message}`);
    if (!data) throw new Error("Mechanic not found");

    return true;
  },
};

module.exports = mechanicService;

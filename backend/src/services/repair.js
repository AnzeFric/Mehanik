const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const repairService = {
  async getVehicleRepairs(mechanicUuid, vehicleUuid) {
    const { data, error } = await supabase
      .from("repairs")
      .select("uuid, type, price, date, options, description, images, note")
      .eq("fk_mechanic", mechanicUuid)
      .eq("fk_vehicle", vehicleUuid);

    if (error)
      throw new Error(`(Fetch repair) Database error: ${error.message}`);

    return data;
  },

  async saveRepair(mechanicUuid, vehicleUuid, repairData) {
    const uuid = uuidv4();

    const { error } = await supabase.from("repairs").insert({
      uuid: uuid,
      type: repairData.type,
      price: repairData.price,
      date: repairData.date,
      options: repairData.options,
      description: repairData.description,
      images: repairData.images,
      note: repairData.note,
      fk_mechanic: mechanicUuid,
      fk_vehicle: vehicleUuid,
    });

    if (error)
      throw new Error(`(Save repair) Database error: ${error.message}`);

    return uuid;
  },

  async deleteRepair(mechanicUuid, repairUuid) {
    const { error } = await supabase
      .from("repairs")
      .delete()
      .eq("uuid", repairUuid)
      .eq("fk_mechanic", mechanicUuid);

    if (error)
      throw new Error(`(Delete repair) Database error: ${error.message}`);

    return true;
  },

  async patchRepairByUuid(mechanicUuid, repairData) {
    const { error } = await supabase
      .from("repairs")
      .update({ ...repairData, updated_at: new Date().toISOString() })
      .eq("uuid", repairData.uuid)
      .eq("fk_mechanic", mechanicUuid);

    if (error)
      throw new Error(`(Update repair) Database error: ${error.message}`);

    return true;
  },
};

module.exports = repairService;

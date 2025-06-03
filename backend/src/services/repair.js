const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const repairService = {
  async getVehicleRepairs(mechanicUuid, vehicleVin) {
    const { data, error } = await supabase
      .from("repairs")
      .select("uuid, type, price, date, options, description, images, note")
      .eq("fk_mechanic", mechanicUuid)
      .eq("fk_vehicle", vehicleVin);

    if (error) throw error;

    return data;
  },

  async saveRepair(mechanicUuid, vehicleVin, repairData) {
    let repairUuid = uuidv4();

    const { error } = await supabase.from("repairs").insert({
      uuid: repairUuid,
      type: repairData.type,
      price: repairData.price,
      date: repairData.date,
      options: repairData.options,
      description: repairData.description,
      images: repairData.images,
      note: repairData.note,
      fk_mechanic: mechanicUuid,
      fk_vehicle: vehicleVin,
    });

    if (error) throw error;

    return repairUuid;
  },

  async deleteRepair(mechanicUuid, repairUuid) {
    const { error } = await supabase
      .from("repairs")
      .delete()
      .eq("uuid", repairUuid)
      .eq("fk_mechanic", mechanicUuid);

    if (error) throw error;

    return true;
  },
};

module.exports = repairService;

const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const repairService = {
  async getVehicleRepairs(mechanicUuid, vehicleVin) {
    const { data, error } = await supabase
      .from("repairs")
      .select("type, price, date, options, message, images")
      .eq("fk_mechanic", mechanicUuid)
      .eq("fk_vehicle", vehicleVin);

    if (error) throw error;

    return data;
  },

  async saveRepair(mechanicUuid, vehicleVin, repairData) {
    let repairUuid = uuidv4();

    const { error } = await supabase.from("repairs").insert({
      uuid: repairUuid,
      type: repairData.tpye,
      price: repairData.price,
      date: repairData.date,
      options: repairData.options,
      message: repairData.message,
      images: repairData.images,
      fk_mechanic: mechanicUuid,
      fk_vehicle: vehicleVin,
    });

    if (error) throw error;

    return repairUuid;
  },
};

module.exports = repairService;

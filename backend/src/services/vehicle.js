const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const vehicleService = {
  async getVehiclesByUserUuid(userUuid) {
    const { data, error } = await supabase
      .from("vehicles")
      .select("uuid, brand, model, build_year, vin, image, description")
      .eq("fk_user", userUuid);

    if (error)
      throw new Error(`(Fetch vehicles) Database error: ${error.message}`);

    return data;
  },

  // Accepts user or customer uuid and vehicleData to save. Both uuid's cannot be null
  async saveVehicleByUserOrCustomerUuid(userUuid, customerUuid, vehicleData) {
    let uuid = uuidv4();

    const { error } = await supabase.from("vehicles").insert({
      uuid: uuid,
      brand: vehicleData.brand,
      model: vehicleData.model,
      build_year: vehicleData.buildYear,
      vin: vehicleData.vin,
      image: vehicleData.image,
      description: vehicleData.description,
      fk_user: userUuid,
      fk_customer: customerUuid,
    });

    if (error)
      throw new Error(`(Save vehicle) Database error: ${error.message}`);

    return uuid;
  },

  async patchByVehicleData(vehicleData) {
    const { data, error } = await supabase
      .from("vehicles")
      .update({
        brand: vehicleData.brand,
        model: vehicleData.model,
        vin: vehicleData.vin,
        build_year: vehicleData.buildYear,
        image: vehicleData.image,
        description: vehicleData.description,
        updated_at: new Date().toISOString(),
      })
      .eq("uuid", vehicleData.uuid)
      .select()
      .maybeSingle();

    if (error)
      throw new Error(`(Update vehicle) Database error: ${error.message}`);
    if (!data) throw new Error("Vehicle not found");

    return true;
  },

  async deleteVehicleByUuid(userUuid, customerUuid, vehicleUuid) {
    let query = supabase.from("vehicles").delete().eq("uuid", vehicleUuid);

    if (customerUuid !== null && customerUuid !== undefined) {
      query = query.eq("fk_customer", customerUuid);
    } else {
      query = query.eq("fk_user", userUuid);
    }

    const { error } = await query;

    if (error)
      throw new Error(`(Delete vehicle) Database error: ${error.message}`);

    return true;
  },
};

module.exports = vehicleService;

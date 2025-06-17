const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const vehicleService = {
  async getVehiclesByUserUuid(userUuid) {
    const { data, error } = await supabase
      .from("vehicles")
      .select("uuid, brand, model, build_year, vin, image, description")
      .eq("fk_user", userUuid);

    if (error) throw error;

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

    if (error) throw error;

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
      throw new Error(`Failed to update vehicle ${email}: ${error.message}`);
    if (!data) throw new Error("Vehicle not found");

    return true;
  },

  async deleteVehicleByUuid(userUuid, customerUuid, vehicleUuid) {
    const { error } = await supabase
      .from("vehicles")
      .delete()
      .eq("uuid", vehicleUuid)
      .eq("fk_user", userUuid)
      .eq("fk_customer", customerUuid);

    if (error)
      throw new Error(`Failed to delete vehicle ${uuid}: ${error.message}`);

    return true;
  },
};

module.exports = vehicleService;

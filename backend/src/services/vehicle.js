const supabase = require("../config/database");

const vehicleService = {
  // Accepts user or customer uuid and vehicleData to save. Both uuid's cannot be null
  async saveVehicle(userUuid, customerUuid, vehicleData) {
    const { error } = await supabase.from("vehicles").insert({
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

    return true;
  },

  async patchByVehicleVin(vehicleVin, vehicleData) {
    const { data, error } = await supabase
      .from("vehicles")
      .update({
        brand: vehicleData.brand,
        model: vehicleData.model,
        vin: vehicleData.vin,
        build_year: vehicleData.buildYear,
        image: vehicleData.image,
        description: vehicleData.description,
      })
      .eq("vin", vehicleVin)
      .select()
      .maybeSingle();

    if (error)
      throw new Error(`Failed to update vehicle ${email}: ${error.message}`);
    if (!data) throw new Error("Vehicle not found");

    return true;
  },
};

module.exports = vehicleService;

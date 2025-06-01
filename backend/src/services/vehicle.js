const supabase = require("../config/database");

const vehicleService = {
  // userUuid or customerUuid can be null, depending on the saving data
  async saveVehicle(userUuid, customerUuid, vehicleData) {
    if (userUuid === null && customerUuid === null) {
      throw new Error("Only one uuid can be null at the same time.");
    }

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
  },
};

module.exports = vehicleService;

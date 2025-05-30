const supabase = require("../config/database");

const vehicleService = {
  async getVehicleByVin(vehicleVin) {
    const { data, error } = await supabase
      .from("vehicles")
      .select("id, brand, model, build_year, vin, image")
      .eq("vin", vehicleVin)
      .maybeSingle();

    if (error) throw error;
    if (!data) throw new Error("Vehicle not found");

    return data;
  },
};

module.exports = vehicleService;

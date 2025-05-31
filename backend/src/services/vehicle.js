const supabase = require("../config/database");

const vehicleService = {
  async getCustomerVehiclesByMechanicUuid(mechanicUuid) {
    const { data, error } = await supabase
      .from("vehicles")
      .select(
        "brand, model, build_year, vin, image, customer:fk_customer(first_name, last_name, phone, email)"
      )
      .eq("customer.fk_mechanic", mechanicUuid);

    if (error) throw error;

    const standardizedData = data.map((vehicle) => ({
      brand: vehicle.brand,
      model: vehicle.model,
      buildYear: vehicle.build_year,
      vin: vehicle.vin,
      image: vehicle.image,
      customer: {
        firstNname: vehicle.customer.first_name,
        lastName: vehicle.customer.last_name,
        phone: vehicle.customer.phone,
        email: vehicle.customer.email,
      },
    }));

    return standardizedData || [];
  },
};

module.exports = vehicleService;

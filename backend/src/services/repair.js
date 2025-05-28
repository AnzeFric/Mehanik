const supabase = require("../config/database");
const userService = require("../services/user");

const repairService = {
  async getRepairedVehiclesByEmail(email) {
    const mechanic = await userService.getEnabledMechanicByEmail(email);
    const mechanicId = mechanic.mechanics[0].id;

    const { data, error } = await supabase
      .from("repairs")
      .select(
        `fk_vehicle, vehicles!inner(id, brand, model, build_year, vin, image, fk_user, users!inner(uuid, email, first_name, last_name))`
      )
      .eq("fk_mechanic", mechanicId);

    if (error) throw error;

    const uniqueVehicles = data.reduce((acc, repair) => {
      const vehicle = {
        id: repair.vehicles.id,
        brand: repair.vehicles.brand,
        model: repair.vehicles.model,
        buildYear: repair.vehicles.build_year,
        vin: repair.vehicles.vin,
        image: repair.vehicles.image,
        owner: repair.vehicles.users,
      };

      if (!acc.find((v) => v.id === vehicle.id)) {
        acc.push(vehicle);
      }
      return acc;
    }, []);

    return uniqueVehicles;
  },
};

module.exports = repairService;

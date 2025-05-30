const supabase = require("../config/database");
const userService = require("../services/user");
const vehicleService = require("../services/vehicle");

const repairService = {
  async getMechanicRepairedVehiclesByEmail(mechanicEmail) {
    const mechanic = await userService.getEnabledMechanicByEmail(mechanicEmail);
    const mechanicId = mechanic.mechanics[0].id;

    const { data, error } = await supabase
      .from("repairs")
      .select(
        `fk_vehicle, vehicles!inner(uuid, brand, model, build_year, vin, image, fk_user, users!inner(uuid, email, first_name, last_name))`
      )
      .eq("fk_mechanic", mechanicId);

    if (error) throw error;

    const uniqueVehicles = data.reduce((acc, repair) => {
      const tempVehicle = repair.vehicles;
      const tempUser = repair.vehicles.users;

      const vehicle = {
        uuid: tempVehicle.uuid,
        brand: tempVehicle.brand,
        model: tempVehicle.model,
        buildYear: tempVehicle.build_year,
        vin: tempVehicle.vin,
        image: tempVehicle.image,
        owner: {
          email: tempUser.email,
          firstName: tempUser.first_name,
          lastName: tempUser.last_name,
        },
      };

      if (!acc.find((v) => v.id === vehicle.id)) {
        acc.push(vehicle);
      }
      return acc;
    }, []);

    return uniqueVehicles;
  },

  async getUserVehicleRepairs(mechanicEmail, vehicleVin) {
    const mechanic = await userService.getEnabledMechanicByEmail(mechanicEmail);
    const mechanicId = mechanic.mechanics[0].id;

    const vehicle = await vehicleService.getVehicleByVin(vehicleVin);
    const vehicleId = vehicle.id;

    const { data, error } = await supabase
      .from("repairs")
      .select("name, price, date, options, message, images")
      .eq("fk_mechanic", mechanicId)
      .eq("fk_vehicle", vehicleId);

    if (error) throw error;

    return data;
  },
};

module.exports = repairService;

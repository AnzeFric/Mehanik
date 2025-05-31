const supabase = require("../config/database");

const repairService = {
  async getMechanicRepairedVehiclesByUuid(mechanicUuid) {
    const { data, error } = await supabase
      .from("repairs")
      .select(
        `fk_vehicle, vehicles!inner(uuid, brand, model, build_year, vin, description, image, fk_user, users!inner(uuid, email, first_name, last_name))`
      )
      .eq("fk_mechanic", mechanicUuid);

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

  async getUserVehicleRepairs(mechanicUuid, vehicleVin) {
    const { data, error } = await supabase
      .from("repairs")
      .select("type, price, date, options, message, images")
      .eq("fk_mechanic", mechanicUuid)
      .eq("fk_vehicle", vehicleVin);

    if (error) throw error;

    return data;
  },
};

module.exports = repairService;

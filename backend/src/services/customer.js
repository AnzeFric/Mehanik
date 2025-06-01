const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const vehicleService = require("./vehicle");
const repairService = require("./repair");

const customerService = {
  async saveCustomerVehicleByMechanicUuid(
    mechanicUuid,
    customerData,
    vehicleData,
    repairData
  ) {
    let customerUuid = uuidv4();

    const { error } = await supabase.from("customers").insert({
      uuid: customerUuid,
      first_name: customerData.firstName,
      last_name: customerData.lastName,
      phone: customerData.phone,
      email: customerData.email,
      fk_mechanic: mechanicUuid,
    });

    if (error) throw error;

    await vehicleService.saveVehicle(null, customerUuid, vehicleData);

    if (repairData) {
      await repairService.saveRepair(mechanicUuid, vehicleData.vin, repairData);
    }

    return customerUuid;
  },

  async getCustomersByMechanicUuid(mechanicUuid) {
    const { data, error } = await supabase
      .from("customers")
      .select(
        "first_name, last_name, phone, email, vehicles(brand, model, build_year, vin, image)"
      )
      .eq("fk_mechanic", mechanicUuid);

    if (error) throw error;

    return data || [];
  },
};

module.exports = customerService;

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
        "uuid, first_name, last_name, phone, email, vehicles(brand, model, build_year, vin, image, description)"
      )
      .eq("fk_mechanic", mechanicUuid);

    if (error) throw error;

    const transformedData = (data || []).map((customer) => ({
      uuid: customer.uuid,
      firstName: customer.first_name,
      lastName: customer.last_name,
      phone: customer.phone,
      email: customer.email,
      vehicles:
        customer.vehicles?.map((vehicle) => ({
          brand: vehicle.brand,
          model: vehicle.model,
          buildYear: vehicle.build_year,
          vin: vehicle.vin,
          image: vehicle.image,
          description: vehicle.description,
        })) || [],
    }));

    return transformedData;
  },

  async deleteByCustomerUuid(customerUuid) {
    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("uuid", customerUuid);

    if (error) throw error;

    return true;
  },
};

module.exports = customerService;

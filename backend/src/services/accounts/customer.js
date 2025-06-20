const supabase = require("../../config/database");
const { v4: uuidv4 } = require("uuid");

const customerService = {
  async saveCustomerByMechanicUuid(mechanicUuid, customerData) {
    let uuid = uuidv4();

    const { error } = await supabase.from("customers").insert({
      uuid: uuid,
      first_name: customerData.firstName,
      last_name: customerData.lastName,
      phone: customerData.phone,
      email: customerData.email,
      fk_mechanic: mechanicUuid,
    });

    if (error)
      throw new Error(`(Save customer) Database error: ${error.message}`);

    return uuid;
  },

  async getCustomersByMechanicUuid(mechanicUuid) {
    const { data, error } = await supabase
      .from("customers")
      .select(
        "uuid, first_name, last_name, phone, email, vehicles(uuid, brand, model, build_year, vin, image, description)"
      )
      .eq("fk_mechanic", mechanicUuid);

    if (error)
      throw new Error(`(Fetch customer) Database error: ${error.message}`);

    const transformedData = (data || []).map((customer) => ({
      uuid: customer.uuid,
      firstName: customer.first_name,
      lastName: customer.last_name,
      phone: customer.phone,
      email: customer.email,
      vehicles:
        customer.vehicles?.map((vehicle) => ({
          uuid: vehicle.uuid,
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

  async deleteByCustomerUuid(customerUuid, mechanicUuid) {
    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("uuid", customerUuid)
      .eq("fk_mechanic", mechanicUuid);

    if (error)
      throw new Error(`(Delete customer) Database error: ${error.message}`);

    return true;
  },

  async patchByCustomerData(customerData, mechanicUuid) {
    const { data, error } = await supabase
      .from("customers")
      .update({
        first_name: customerData.firstName,
        last_name: customerData.lastName,
        phone: customerData.phone,
        email: customerData.email,
        updated_at: new Date().toISOString(),
      })
      .eq("uuid", customerData.uuid)
      .eq("fk_mechanic", mechanicUuid)
      .select()
      .maybeSingle();

    if (error)
      throw new Error(`(Update customer) Database error: ${error.message}`);
    if (!data) throw new Error("Customer not found");

    return true;
  },
};

module.exports = customerService;

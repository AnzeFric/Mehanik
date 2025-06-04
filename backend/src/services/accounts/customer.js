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

    if (error) throw error;

    return uuid;
  },

  async getCustomersByMechanicUuid(mechanicUuid) {
    const { data, error } = await supabase
      .from("customers")
      .select(
        "uuid, first_name, last_name, phone, email, vehicles(uuid, brand, model, build_year, vin, image, description)"
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

  async deleteByCustomerUuid(customerUuid) {
    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("uuid", customerUuid);

    if (error) throw error;

    return true;
  },

  async patchByCustomerData(customerData) {
    const { data, error } = await supabase
      .from("customers")
      .update({
        first_name: customerData.firstName,
        last_name: customerData.lastName,
        phone: customerData.phone,
        email: customerData.email,
      })
      .eq("uuid", customerData.uuid)
      .select()
      .maybeSingle();

    if (error)
      throw new Error(
        `Failed to update user ${customerUuid}: ${error.message}`
      );
    if (!data) throw new Error("Customer not found");

    return true;
  },
};

module.exports = customerService;

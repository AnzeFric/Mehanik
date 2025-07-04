const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const appointmentService = {
  async getAppointmentsByMechanicUuid(mechanicUuid) {
    const { data, error } = await supabase
      .from("appointments")
      .select(
        "uuid, start_date, end_date, status, user_message, vehicles(brand, model, build_year, fk_customer, users(first_name, last_name))"
      )
      .eq("fk_mechanic", mechanicUuid);

    if (error)
      throw new Error(
        `(Fetch appointments - mechanicUuid) Database error: ${error.message}`
      );

    const filtered = data.filter(
      (appointment) => appointment.vehicles?.fk_customer === null // Only return users
    );

    return filtered;
  },

  async getAppointmentsByUserUuid(userUuid) {
    const { data, error } = await supabase
      .from("appointments")
      .select(
        "uuid, start_date, end_date, status, mechanic_response, mechanics(phone, address, city, users(first_name, last_name, email)), vehicles(fk_user, brand, model, build_year)"
      );

    if (error)
      throw new Error(
        `(Fetch appointments - userUuid) Database error: ${error.message}`
      );

    const filtered = data.filter((appointment) => {
      if (
        appointment.vehicles &&
        appointment.vehicles.fk_user !== undefined &&
        appointment.vehicles.fk_user !== null
      ) {
        return appointment.vehicles.fk_user === userUuid;
      }
      return false; // Exclude appointments without valid user uuid
    });

    return filtered;
  },

  async saveAppointmentByVehicleUuid(
    vehicleUuid,
    mechanicUuid,
    appointmentData
  ) {
    const uuid = uuidv4();

    const { error } = await supabase.from("appointments").insert({
      uuid: uuid,
      start_date: appointmentData.startDate,
      end_date: appointmentData.endDate,
      status: appointmentData.status,
      user_message: appointmentData.userMessage,
      mechanic_response: appointmentData.mechanicResponse,
      fk_vehicle: vehicleUuid,
      fk_mechanic: mechanicUuid,
    });

    if (error)
      throw new Error(`(Save appointment) Database error: ${error.message}`);

    return uuid;
  },

  async updateAppointmentByUuid(appointmentData) {
    const { error } = await supabase
      .from("appointments")
      .update({
        start_date: appointmentData.startDate,
        end_date: appointmentData.endDate,
        status: appointmentData.status,
        user_message: appointmentData.userMessage,
        mechanic_response: appointmentData.mechanicResponse,
        updated_at: new Date().toISOString(),
      })
      .eq("uuid", appointmentData.uuid);

    if (error)
      throw new Error(`(Update appointment) Database error: ${error.message}`);

    return true;
  },

  async deleteAppointment(appointmentUuid) {
    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("uuid", appointmentUuid);

    if (error)
      throw new Error(`(Delete appointment) Database error: ${error.message}`);

    return true;
  },

  async getMechanicUserUuidByAppointmentUuid(appointmentUuid) {
    const { data, error } = await supabase
      .from("appointments")
      .select("uuid, mechanics!fk_mechanic(users!fk_user(uuid))")
      .eq("uuid", appointmentUuid)
      .maybeSingle();

    if (error)
      throw new Error(
        `(Get appointment mechanic user uuid) Database error: ${error.message}`
      );

    return data?.mechanics?.users?.uuid || null;
  },

  async getUserUserUuidByAppointmentUuid(appointmentUuid) {
    console.log("Appt uuid: ", appointmentUuid);

    const { data, error } = await supabase
      .from("appointments")
      .select("uuid, vehicles!fk_vehicle(users!fk_user(uuid))")
      .eq("uuid", appointmentUuid)
      .maybeSingle();

    if (error)
      throw new Error(
        `(Get appointment user user uuid) Database error: ${error.message}`
      );
    console.log("Data: ", data);

    return data?.vehicles?.users?.uuid || null;
  },
};

module.exports = appointmentService;

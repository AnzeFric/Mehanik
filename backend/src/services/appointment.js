const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const appointmentService = {
  async getAppointmentsByMechanicUuid(mechanicUuid) {
    const { data, error } = await supabase
      .from("appointments")
      .select(
        "uuid, start_date, end_date, status, user_message, vehicles(brand, model, build_year, users(first_name, last_name))"
      )
      .eq("fk_mechanic", mechanicUuid)
      .is("vehicles.fk_customer", null);

    if (error) {
      console.error("Appointment mechanic database error:", error);
      throw new Error(
        `Failed to fetch appointments for mechanic: ${error.message}`
      );
    }
    return data;
  },

  async getAppointmentsByVehicleUuid(vehicleUuid) {
    const { data, error } = await supabase
      .from("appointments")
      .select(
        "uuid, start_date, end_date, status, mechanic_response, mechanics(phone, address, city, users(first_name, last_name))"
      )
      .eq("fk_vehicle", vehicleUuid);

    if (error) {
      console.error("Appointment vehicle database error:", error);
      throw new Error(
        `Failed to fetch appointments for vehicle: ${error.message}`
      );
    }
    return data;
  },

  async saveAppointmentByUserUuid(userUuid, mechanicUuid, appointmentData) {
    const uuid = uuidv4();

    const { error } = await supabase.from("appointments").insert({
      uuid: uuid,
      start_date: appointmentData.startDate,
      end_date: appointmentData.endDate,
      status: appointmentData.status,
      user_message: appointmentData.userMessage,
      mechanic_response: appointmentData.mechanicResponse,
      fk_user: userUuid,
      fk_mechanic: mechanicUuid,
    });

    if (error) throw error;

    return uuid;
  },

  async updateAppointmentByUserUuid(userUuid, appointmentData) {},
};

module.exports = appointmentService;

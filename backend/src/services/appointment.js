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

    if (error) {
      console.error("Appointment mechanic database error:", error);
      throw new Error(
        `Failed to fetch appointments for mechanic: ${error.message}`
      );
    }
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

    if (error) {
      console.error("Appointment vehicle database error:", error);
      throw new Error(
        `Failed to fetch appointments for vehicle: ${error.message}`
      );
    }

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

    if (error) throw error;

    return uuid;
  },

  async updateAppointmentByMechanicUuid(appointmentData) {
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

    if (error) throw error;

    return true;
  },

  async deleteAppointment(appointmentUuid) {
    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("uuid", appointmentUuid);

    if (error) throw error;

    return true;
  },
};

module.exports = appointmentService;

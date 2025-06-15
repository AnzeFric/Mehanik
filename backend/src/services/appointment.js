const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const appointmentService = {
  async getAppointmentsByUserUuid(userUuid) {
    const { data, error } = await supabase
      .from("appointments")
      .select("uuid, date, status, user_message, mechanic_response")
      .eq("fk_user", userUuid);

    if (error) throw error;

    const parsedData = (data || []).map((appointment) => ({
      uuid: appointment.uuid,
      date: appointment.date,
      status: appointment.status,
      userMessage: appointment.user_message,
      mechanicResponse: appointment.mechanic_response,
    }));

    return parsedData;
  },

  async saveAppointmentByUserUuid(userUuid, appointmentData) {
    const uuid = uuidv4();

    const { error } = await supabase.from("appointments").insert({
      uuid: uuid,
      date: appointmentData.date,
      status: appointmentData.status,
      user_message: appointmentData.userMessage,
      mechanic_response: appointmentData.mechanicResponse,
      fk_user: userUuid,
      fk_mechanic: appointmentData.mechanicUuid,
    });

    if (error) throw error;

    return uuid;
  },

  async updateAppointmentByUserUuid(userUuid, appointmentData) {},
};

module.exports = appointmentService;

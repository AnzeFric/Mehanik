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

  async saveAppointmentByUserUuid(userUuid, appointmentData) {},

  async updateAppointmentByUserUuid(userUuid, appointmentData) {},
};

module.exports = appointmentService;

const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const appointmentService = {
  async getAppointmentsByUserUuid(userUuid) {},

  async saveAppointmentByUserUuid(userUuid, appointmentData) {},

  async updateAppointmentByUserUuid(userUuid, appointmentData) {},
};

module.exports = appointmentService;

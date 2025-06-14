const appointmentService = require("../services/appointment");

const appointmentController = {
  async getAppointments(req, res, next) {
    try {
      const userUuid = req.user.userUuid;
      const appointments =
        await appointmentService.getAppointmentsByUserUuid(userUuid);

      return res.status(200).json({
        success: true,
        message: "User appointments fetch successfully",
        appointments: appointments,
      });
    } catch (error) {
      next(error);
    }
  },

  async saveAppointment(req, res, next) {
    try {
      const userUuid = req.user.userUuid;
      const appointmentData = req.body.appointmentData;
      await appointmentService.saveAppointmentByUserUuid(
        userUuid,
        appointmentData
      );

      return res.status(200).json({
        success: true,
        message: "User appointment saved successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async updateAppointment(req, res, next) {
    try {
      const userUuid = req.user.userUuid;
      const appointmentData = req.body.appointmentData;
      await appointmentService.updateAppointmentByUserUuid(
        userUuid,
        appointmentData
      );

      return res.status(200).json({
        success: true,
        message: "User appointment updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = appointmentController;

const appointmentService = require("../services/appointment");

const appointmentController = {
  async getAppointments(req, res, next) {
    try {
      const mechanicUuid = req.user.mechanicUuid;
      const vehicleUuid = req.body.vehicleUuid;

      if (mechanicUuid) {
        const appointments =
          await appointmentService.getAppointmentsByMechanicUuid(mechanicUuid);

        var resData = (appointments || []).map((appointment) => ({
          uuid: appointment.uuid,
          startDate: appointment.start_date,
          endDate: appointment.end_date,
          status: appointment.status,
          userMessage: appointment.user_message,
          user: {
            firstName: appointment.vehicles?.users?.first_name || "",
            lastName: appointment.vehicles?.users?.last_name || "",
            email: appointment.vehicles?.users?.email || "",
          },
          vehicle: {
            brand: appointment.vehicles?.brand || "",
            model: appointment.vehicles?.model || "",
            buildYear: appointment.vehicles?.build_year || "",
          },
        }));
      } else {
        if (!vehicleUuid) throw new Error("Vehicle uuid not provided!");

        const appointments =
          await appointmentService.getAppointmentsByVehicleUuid(vehicleUuid);

        var resData = (appointments || []).map((appointment) => ({
          uuid: appointment.uuid,
          startDate: appointment.start_date,
          endDate: appointment.end_date,
          status: appointment.status,
          mechanicResponse: appointment.mechanic_response,
          mechanic: {
            firstName: appointment.mechanics.users.first_name,
            lastName: appointment.mechanics.users.last_name,
            phone: appointment.mechanics.phone,
            address: appointment.mechanics.address,
            city: appointment.mechanics.city,
          },
        }));
      }

      return res.status(200).json({
        success: true,
        message: "Appointments fetch successfully",
        appointments: resData,
      });
    } catch (error) {
      next(error);
    }
  },

  async saveAppointment(req, res, next) {
    try {
      const userUuid = req.user.userUuid;
      const mechanicUuid = req.body.mechanicUuid;
      const appointmentData = req.body.appointmentData;

      if (!mechanicUuid) throw new Error("Mechanic uuid not provided!");
      if (!appointmentData) throw new Error("Appointment data not provided!");

      await appointmentService.saveAppointmentByUserUuid(
        userUuid,
        mechanicUuid,
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

      if (!appointmentData) throw new Error("Appointment data not provided!");

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

const appointmentService = require("../services/appointment");
const userService = require("../services/accounts/user");
const notificationService = require("../services/notification");

const appointmentController = {
  async getMechanicAppointments(req, res, next) {
    try {
      console.log("Get mechanic appointments. Req from: ", req.user);
      console.log("Body: ", req.body);

      const mechanicUuid = req.user.mechanicUuid;
      const mechanicEmail = req.body.mechanicEmail;

      if (mechanicUuid) {
        // Returns detailed data for the authorized mechanic
        let appointments =
          await appointmentService.getAppointmentsByMechanicUuid(mechanicUuid);

        appointments = appointments.filter(
          (appointment) => appointment.status != "changed"
        );

        var parsedData = (appointments || []).map((appointment) => ({
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
        // Returns limited data for users looking to book an appointment
        if (!mechanicEmail) throw new Error("Mechanic email not provided!");

        const mechanic =
          await userService.getMechanicByEmailAndEnabled(mechanicEmail);

        let appointments =
          await appointmentService.getAppointmentsByMechanicUuid(
            mechanic.mechanics[0].uuid
          );

        let today = new Date();
        today.setHours(0, 0, 0, 0);

        // Only return appointments that are accepted and from today onward. The user does not need to see mechanics past work history.
        appointments = appointments.filter(
          (appointment) =>
            appointment.status === "accepted" &&
            new Date(appointment.start_date) >= today
        );

        var parsedData = (appointments || []).map((appointment) => ({
          startDate: appointment.start_date,
          endDate: appointment.end_date,
        }));
      }

      return res.status(200).json({
        success: true,
        message: "Appointments fetch successfully",
        appointments: parsedData,
      });
    } catch (error) {
      next(error);
    }
  },

  async getUserAppointments(req, res, next) {
    try {
      console.log("Get all user vehicles appointments. Req from: ", req.user);
      console.log("Body: ", req.body);

      const userUuid = req.user.userUuid;

      let appointments =
        await appointmentService.getAppointmentsByUserUuid(userUuid);

      appointments = appointments.filter(
        (appointment) =>
          appointment.status != "pending" && appointment.status != "hidden"
      );

      var parsedData = (appointments || []).map((appointment) => ({
        uuid: appointment.uuid,
        startDate: appointment.start_date,
        endDate: appointment.end_date,
        status: appointment.status,
        mechanicResponse: appointment.mechanic_response,
        mechanic: {
          firstName: appointment.mechanics?.users?.first_name || "",
          lastName: appointment.mechanics?.users?.last_name || "",
          email: appointment.mechanics?.users?.email || "",
          phone: appointment.mechanics?.phone || "",
          address: appointment.mechanics?.address || "",
          city: appointment.mechanics?.city || "",
        },
        vehicle: {
          brand: appointment.vehicles?.brand || "",
          model: appointment.vehicles?.model || "",
          buildYear: appointment.vehicles?.build_year || "",
        },
      }));

      return res.status(200).json({
        success: true,
        message: "Appointments fetch successfully",
        appointments: parsedData,
      });
    } catch (error) {
      next(error);
    }
  },

  async saveAppointment(req, res, next) {
    try {
      console.log("Save appointment. Req from: ", req.user);
      console.log("Body: ", req.body);

      const { vehicleUuid, mechanicEmail, appointmentData } = req.body;

      if (!vehicleUuid) throw new Error("Vehicle uuid not provided!");
      if (!mechanicEmail) throw new Error("Mechanic email not provided!");
      if (!appointmentData) throw new Error("Appointment data not provided!");

      const mechanic =
        await userService.getMechanicByEmailAndEnabled(mechanicEmail);

      await appointmentService.saveAppointmentByVehicleUuid(
        vehicleUuid,
        mechanic.mechanics[0].uuid,
        appointmentData
      );

      // Send notification to mechanic
      const token = await notificationService.getPushTokenByUserUuid(
        mechanic.uuid
      );
      if (token) {
        await notificationService.sendPushNotification(
          token,
          "Nov termin",
          "Stranka je rezervirala nov termin"
        );
      }

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
      console.log("Update appointment. Req from: ", req.user);
      console.log("Body: ", req.body);

      const appointmentData = req.body.appointmentData;
      const sentFrom = req.body.sentFrom; // user or mechanic

      if (!appointmentData) throw new Error("Appointment data not provided!");
      if (!sentFrom) throw new Error("Sent from data not provided!");

      await appointmentService.updateAppointmentByUuid(appointmentData);

      if (sentFrom === "user") {
        // Get mechanic userUuid by vehicle uuid
        var userUuid =
          await appointmentService.getMechanicUserUuidByAppointmentUuid(
            appointmentData.uuid
          );
      } else if (sentFrom === "mechanic") {
        // Get user userUuid by mechanic uuid
        var userUuid =
          await appointmentService.getUserUserUuidByAppointmentUuid(
            appointmentData.uuid
          );
      }

      if (appointmentData.status != "hidden") {
        const statusToText = {
          accepted: "Termin je bil potrjen",
          changed: "Mehanik je spremenil termin",
          pending: "Stranka je spremenila termin",
          rejected: "Termin je bil zavrjen",
        };

        const token =
          await notificationService.getPushTokenByUserUuid(userUuid);
        if (token) {
          await notificationService.sendPushNotification(
            token,
            "Spremenjen termin",
            statusToText[appointmentData.status]
          );
        }
      }

      return res.status(200).json({
        success: true,
        message: "User appointment updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteAppointment(req, res, next) {
    try {
      console.log("Delete appointment. Req from: ", req.user);
      console.log("Body: ", req.body);

      const appointmentUuid = req.body.appointmentUuid;

      if (!appointmentUuid) throw new Error("Appointment uuid is not provided");

      await appointmentService.deleteAppointment(appointmentUuid);

      return res.status(200).json({
        success: true,
        message: "User appointment deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = appointmentController;

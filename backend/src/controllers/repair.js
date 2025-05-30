const repairService = require("../services/repair");

const repairController = {
  async getMechanicRepairedVehicles(req, res, next) {
    try {
      console.log("Repaired vehicles fetch: ", req.user);
      const mechanicEmail = req.user.email;
      const vehicles =
        await repairService.getMechanicRepairedVehiclesByEmail(mechanicEmail);
      res.status(200).send({
        success: true,
        message: "Repaired vehicles fetch successfully",
        vehicles: vehicles,
      });
    } catch (error) {
      next(error);
    }
  },

  async getCustomerVehicleRepairs(req, res, next) {
    try {
      console.log("Vehicle repairs fetch: ", req.user);
      const mechanicEmail = req.user.email;
      const vehicleVin = req.body.vin;
      const repairs = await repairService.getUserVehicleRepairs(
        mechanicEmail,
        vehicleVin
      );
      res.status(200).send({
        success: true,
        message: "Vehicle repairs fetch successfully",
        repairs: repairs,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = repairController;

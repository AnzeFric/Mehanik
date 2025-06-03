const repairService = require("../services/repair");

const repairController = {
  async getCustomerVehicleRepairs(req, res, next) {
    try {
      console.log("Vehicle repairs fetch: ", req.user);
      const repairs = await repairService.getVehicleRepairs(
        req.user.mechanicUuid,
        req.body.vin
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

  async saveCustomerVehicleRepair(req, res, next) {
    try {
      console.log("Vehicle repairs save: ", req.user);
      await repairService.saveVehicleRepairs(
        req.user.mechanicUuid,
        req.body.vin,
        req.body.repairs
      );
    } catch (error) {
      next(error);
    }
  },
};

module.exports = repairController;

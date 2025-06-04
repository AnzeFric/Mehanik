const repairService = require("../services/repair");

const repairController = {
  async getRepairs(req, res, next) {
    try {
      console.log("Get repairs. Req from: ", req.user);
      console.log("Body: ", req.body);

      const repairs = await repairService.getVehicleRepairs(
        req.user.mechanicUuid,
        req.body.vehicleUuid
      );
      return res.status(200).send({
        success: true,
        message: "Vehicle repairs fetch successfully",
        repairs: repairs,
      });
    } catch (error) {
      next(error);
    }
  },

  async saveRepair(req, res, next) {
    try {
      console.log("Save repair. Req from: ", req.user);
      console.log("Body: ", req.body);

      await repairService.saveRepair(
        req.user.mechanicUuid,
        req.body.vehicleUuid,
        req.body.repairs
      );
      return res.status(200).send({
        success: true,
        message: "Vehicle repairs saved successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteRepair(req, res, next) {
    try {
      console.log("Delete repair. Req from: ", req.user);
      console.log("Body: ", req.body);

      await repairService.deleteRepair(
        req.user.mechanicUuid,
        req.body.repairUuid
      );
      return res.status(200).send({
        success: true,
        message: "Vehicle repair deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = repairController;

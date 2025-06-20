const repairService = require("../services/repair");

const repairController = {
  async getRepairs(req, res, next) {
    try {
      console.log("Get repairs. Req from: ", req.user);
      console.log("Body: ", req.body);

      const vehicleUuid = req.body.vehicleUuid;

      if (!vehicleUuid) throw new Error("Vehicle uuid is not provided");

      const repairs = await repairService.getVehicleRepairs(
        req.user.mechanicUuid,
        vehicleUuid
      );

      return res.status(200).json({
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

      const repairData = req.body.repairData;
      const vehicleUuid = req.body.vehicleUuid;

      if (!repairData && !repairData.type)
        throw new Error("Repair data is not provided");
      if (!vehicleUuid) throw new Error("Vehicle uuid is not provided");

      const uuid = await repairService.saveRepair(
        req.user.mechanicUuid,
        vehicleUuid,
        repairData
      );

      return res.status(200).json({
        success: true,
        message: "Vehicle repairs saved successfully",
        repairUuid: uuid,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteRepair(req, res, next) {
    try {
      console.log("Delete repair. Req from: ", req.user);
      console.log("Body: ", req.body);

      const repairUuid = req.body.repairUuid;

      if (!repairUuid) throw new Error("Repair uuid is not provided");

      await repairService.deleteRepair(req.user.mechanicUuid, repairUuid);

      return res.status(200).json({
        success: true,
        message: "Vehicle repair deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async patchRepair(req, res, next) {
    try {
      console.log("Patch repair. Req from: ", req.user);
      console.log("Body: ", req.body);

      const repairData = req.body.repairData;

      if (!repairData && !repairData.type)
        throw new Error("Repair data is not provided");

      await repairService.patchRepairByUuid(req.user.mechanicUuid, repairData);

      return res.status(200).json({
        success: true,
        message: "Vehicle repair updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = repairController;

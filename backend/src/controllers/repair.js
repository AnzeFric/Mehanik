const repairService = require("../services/repair");

const repairController = {
  async getRepairedVehiclesByMechanic(req, res, next) {
    try {
      const userEmail = req.user.email;
      const vehicles =
        await repairService.getRepairedVehiclesByEmail(userEmail);
      res.status(200).send({
        success: true,
        message: "Repaired vehicles fetch successfully",
        vehicles: vehicles,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = repairController;

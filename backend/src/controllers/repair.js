const repairService = require("../services/repair");

const repairController = {
  async getMechanicRepairedVehicles(req, res, next) {
    try {
      console.log("Repaired vehicles fetch: ", req.user);
      const userEmail = req.user.email;
      const vehicles =
        await repairService.getRepairedVehiclesByEmail(userEmail);
      res.status(200).send({
        success: true,
        message: "Repaired vehicles fetch successfully",
        repairs: vehicles,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = repairController;

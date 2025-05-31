const vehicleService = require("../services/vehicle");

const vehicleController = {
  async getMechanicCustomers(req, res, next) {
    try {
      const customers = await vehicleService.getCustomerVehiclesByMechanicUuid(
        req.user.mechanicUuid
      );
      return res.status(200).send({
        success: true,
        message: "Customers fetch successful",
        customers: customers,
      });
    } catch (error) {
      next(error);
    }
  },

  async saveMechanicCustomer(req, res, next) {
    try {
      console.log("post: save mechanic customer ", req.user);
      return res.status(200).send({
        success: true,
        message: "Customer saved successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = vehicleController;

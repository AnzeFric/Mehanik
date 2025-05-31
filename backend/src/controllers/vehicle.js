const vehicleService = require("../services/vehicle");

const vehicleController = {
  async getMechanicCustomers(req, res, next) {
    try {
      const mechanicEmail = req.user.email;
      const mechanic =
        await userService.getEnabledMechanicByEmail(mechanicEmail);
      const customers = await vehicleService.getCustomerVehiclesByMechanicUuid(
        mechanic.uuid
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
    } catch (error) {
      next(error);
    }
  },
};

module.exports = vehicleController;

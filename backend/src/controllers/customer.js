const customerService = require("../services/customer");

const customerController = {
  async getCustomers(req, res, next) {
    try {
      const customers = await customerService.getCustomersByMechanicUuid(
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

  async saveCustomer(req, res, next) {
    try {
      console.log("Save customer: ", req.user);
      const mechanicUuid = req.user.mechanicUuid;
      const customerData = req.body.customerData;
      const vehicleData = req.body.vehicleData;
      const repairData = req.body.repairData;

      await customerService.saveCustomerVehicleByMechanicUuid(
        mechanicUuid,
        customerData,
        vehicleData,
        repairData
      );
      return res.status(200).send({
        success: true,
        message: "Customer saved successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteCustomer(req, res, next) {
    try {
      console.log("Delete customer: ", req.user);
      if (!req.body.customerUuid)
        throw new Error("Customer UUID is not provided");

      await customerService.deleteByCustomerUuid(req.body.customerUuid);
      return res.status(200).send({
        success: true,
        message: "Customer deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = customerController;

const customerService = require("../services/customer");

const customerController = {
  async getCustomers(req, res, next) {
    try {
      console.log(`Get customers. Req from: ${req.user}, data: ${req.body}`);
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
      console.log(`Save customer. Req from: ${req.user}, data: ${req.body}`);
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
      console.log(`Delete customer. Req from: ${req.user}, data: ${req.body}`);
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

  async patchCustomer(req, res, next) {
    try {
      console.log(`Patch customer. Req from: ${req.user}, data: ${req.body}`);
      if (!req.body.customerUuid)
        throw new Error("Customer UUID is not provided");

      if (!req.body.customerData)
        throw new Error("New customer data is not provided");

      const newCustomerData = req.body.customerData;
      const allowedFields = ["firstName", "lastName", "phone", "email"];
      const mandatoryFields = ["firstName", "lastName"];

      const forbiddenField = Object.keys(newCustomerData).find(
        (field) => !allowedFields.includes(field)
      );
      if (forbiddenField) {
        return res.status(403).json({
          success: false,
          message: `Field '${forbiddenField}' is not allowed`,
        });
      }

      const missingField = mandatoryFields.find(
        (field) => !newCustomerData[field]
      );
      if (missingField) {
        return res.status(403).json({
          success: false,
          message: `Field '${missingField}' is missing`,
        });
      }

      await customerService.patchByCustomerUuid(
        req.body.customerUuid,
        newCustomerData
      );
      return res.status(200).send({
        success: true,
        message: "Customer patched successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = customerController;

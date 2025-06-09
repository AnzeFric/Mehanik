const customerService = require("../../services/accounts/customer");
const vehicleService = require("../../services/vehicle");
const repairService = require("../../services/repair");

const vehicleController = require("../../controllers/vehicle");

const customerController = {
  async getCustomers(req, res, next) {
    try {
      console.log("Get customers. Req from: ", req.user);
      console.log("Body: ", req.body);

      const customers = await customerService.getCustomersByMechanicUuid(
        req.user.mechanicUuid
      );
      return res.status(200).json({
        success: true,
        message: "Customers fetch successful",
        customers: customers,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteCustomer(req, res, next) {
    try {
      console.log("Delete customer. Req from: ", req.user);
      console.log("Body: ", req.body);

      const customerUuid = req.body.customerUuid;
      const mechanicUuid = req.user.mechanicUuid;
      if (!customerUuid) throw new Error("Customer UUID is not provided");

      await customerService.deleteByCustomerUuid(customerUuid, mechanicUuid);

      const customers = await customerService.getCustomersByMechanicUuid(
        req.user.mechanicUuid
      );

      return res.status(200).json({
        success: true,
        message: "Customer deleted successfully",
        customers: customers,
      });
    } catch (error) {
      next(error);
    }
  },

  async patchCustomerVehicle(req, res, next) {
    try {
      console.log("Patch customer, vehicle. Req from: ", req.user);
      console.log("Body: ", req.body);

      const { customerData, vehicleData } = req.body;
      const mechanicUuid = req.user.mechanicUuid;
      if (!customerData) throw new Error("Customer data is not provided");
      if (!vehicleData) throw new Error("Vehicle data is not provided");

      await checkInput(customerData, "uuid");
      await customerService.patchByCustomerData(customerData, mechanicUuid);

      await vehicleController.checkInput(vehicleData, "uuid");
      await vehicleService.patchByVehicleData(vehicleData);

      const customers =
        await customerService.getCustomersByMechanicUuid(mechanicUuid);

      return res.status(200).json({
        success: true,
        message: "Customer and vehicle patched successfully",
        customers: customers,
      });
    } catch (error) {
      next(error);
    }
  },

  async saveCustomerVehicleRepair(req, res, next) {
    try {
      console.log("Save customer, vehicle, repair. Req from: ", req.user);
      console.log("Body: ", req.body);

      const mechanicUuid = req.user.mechanicUuid;
      const { customerData, vehicleData, repairData } = req.body;
      if (!customerData) throw new Error("Customer data is not provided");
      if (!vehicleData) throw new Error("Customer data is not provided");

      await checkInput(customerData);
      const customerUuid = await customerService.saveCustomerByMechanicUuid(
        mechanicUuid,
        customerData
      );

      await vehicleController.checkInput(vehicleData);
      const vehicleUuid = await vehicleService.saveVehicleByUserOrCustomerUuid(
        null,
        customerUuid,
        vehicleData
      );

      if (repairData) {
        await repairService.saveRepair(mechanicUuid, vehicleUuid, repairData);
      }

      const customers = await customerService.getCustomersByMechanicUuid(
        req.user.mechanicUuid
      );

      return res.status(200).json({
        success: true,
        message: "Customer, vehicle and optional repair saved successfully",
        customers: customers,
      });
    } catch (error) {
      next(error);
    }
  },
};

async function checkInput(customerData, customField) {
  const allowedFields = ["uuid", "firstName", "lastName", "phone", "email"];
  const mandatoryFields = ["firstName", "lastName"];
  if (customField) {
    mandatoryFields.push(customField);
  }

  const forbiddenField = Object.keys(customerData).find(
    (field) => !allowedFields.includes(field)
  );
  if (forbiddenField) {
    const error = new Error(`Field '${forbiddenField}' is not allowed`);
    error.status = 403;
    throw error;
  }

  const missingField = mandatoryFields.find((field) => !customerData[field]);
  if (missingField) {
    const error = new Error(`Field '${missingField}' is missing`);
    error.status = 403;
    throw error;
  }
}

module.exports = customerController;

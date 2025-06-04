const customerService = require("../../services/accounts/customer");

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

  async saveCustomer(req, res, next) {
    try {
      console.log("Save customer. Req from: ", req.user);
      console.log("Body: ", req.body);

      const mechanicUuid = req.user.mechanicUuid;
      const customerData = req.body.customerData;
      if (!customerData) throw new Error("Customer data is not provided");

      await checkInput(customerData);
      const customerUuid = await customerService.saveCustomerByMechanicUuid(
        mechanicUuid,
        customerData
      );
      return res.status(200).json({
        success: true,
        message: "Customer saved successfully",
        customerUuid: customerUuid,
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
      if (!customerUuid) throw new Error("Customer UUID is not provided");

      await customerService.deleteByCustomerUuid(customerUuid);
      return res.status(200).json({
        success: true,
        message: "Customer deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async patchCustomer(req, res, next) {
    try {
      console.log("Patch customer. Req from: ", req.user);
      console.log("Body: ", req.body);

      const customerData = req.body.customerData;
      if (!req.body.customerData)
        throw new Error("Customer data is not provided");

      await checkInput(customerData, "uuid");
      await customerService.patchByCustomerData(customerData);

      return res.status(200).json({
        success: true,
        message: "Customer patched successfully",
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

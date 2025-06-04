const vehicleService = require("../services/vehicle");

const vehicleController = {
  async saveVehicle(req, res, next) {
    try {
      console.log("Save vehicle. Req from: ", req.user);
      console.log("Body: ", req.body);

      const vehicleData = req.body.vehicleData;
      const userUuid = req.body.userUuid;
      const customerUuid = req.body.customerUuid;

      if (!vehicleData) throw new Error("Vehicle data is not provided");
      if (!userUuid && !customerUuid)
        throw new Error("No user or customer uuid provided");

      await checkInput(vehicleData);
      if (userUuid) {
        var vehicleUuid = await vehicleService.saveVehicleByUserOrCustomerUuid(
          userUuid,
          null,
          vehicleData
        );
      } else {
        var vehicleUuid = await vehicleService.saveVehicleByUserOrCustomerUuid(
          null,
          customerUuid,
          vehicleData
        );
      }

      return res.status(200).json({
        success: true,
        message: "Vehicle saved successfully",
        vehicleUuid: vehicleUuid,
      });
    } catch (error) {
      next(error);
    }
  },

  async patchVehicle(req, res, next) {
    try {
      console.log("Patch vehicle. Req from: ", req.user);
      console.log("Body: ", req.body);

      const vehicleData = req.body.vehicleData;
      if (!vehicleData) throw new Error("Vehicle data is not provided");

      await checkInput(vehicleData, "uuid");
      await vehicleService.patchByVehicleData(vehicleData);

      return res.status(200).json({
        success: true,
        message: "Vehicle patched successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

async function checkInput(vehicleData, customField) {
  const allowedFields = [
    "uuid",
    "brand",
    "model",
    "vin",
    "buildYear",
    "image",
    "description",
  ];
  const mandatoryFields = ["brand", "model", "vin"];
  if (customField) {
    mandatoryFields.push(customField);
  }

  const forbiddenField = Object.keys(vehicleData).find(
    (field) => !allowedFields.includes(field)
  );
  if (forbiddenField) {
    const error = new Error(`Field '${forbiddenField}' is not allowed`);
    error.status = 403;
    throw error;
  }

  const missingField = mandatoryFields.find((field) => !vehicleData[field]);
  if (missingField) {
    const error = new Error(`Field '${missingField}' is missing`);
    error.status = 403;
    throw error;
  }
}

module.exports = {
  ...vehicleController,
  checkInput, // <-- add this line
};

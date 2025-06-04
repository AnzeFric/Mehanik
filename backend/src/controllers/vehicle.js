const vehicleService = require("../services/vehicle");

const vehicleController = {
  async patchVehicle(req, res, next) {
    try {
      console.log("Patch vehicle. Req from: ", req.user);
      console.log("Body: ", req.body);

      if (!req.body.vehicleData)
        throw new Error("New vehicle data is not provided");

      const newVehicleData = req.body.vehicleData;
      const allowedFields = [
        "brand",
        "model",
        "vin",
        "buildYear",
        "image",
        "description",
      ];
      const mandatoryFields = ["brand", "model", "vin"];

      const forbiddenField = Object.keys(newVehicleData).find(
        (field) => !allowedFields.includes(field)
      );
      if (forbiddenField) {
        return res.status(403).json({
          success: false,
          message: `Field '${forbiddenField}' is not allowed`,
        });
      }

      const missingField = mandatoryFields.find(
        (field) => !newVehicleData[field]
      );
      if (missingField) {
        return res.status(403).json({
          success: false,
          message: `Field '${missingField}' is missing`,
        });
      }

      await vehicleService.patchByVehicleData(newVehicleData);
      return res.status(200).send({
        success: true,
        message: "Vehicle patched successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = vehicleController;

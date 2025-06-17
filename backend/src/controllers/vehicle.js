const vehicleService = require("../services/vehicle");

const vehicleController = {
  async getVehicles(req, res, next) {
    try {
      console.log("Fetch vehicles. Req from: ", req.user);
      console.log("Body: ", req.body);

      const userUuid = req.user.userUuid;

      const vehicles = await vehicleService.getVehiclesByUserUuid(userUuid);

      const parsedData = (vehicles || []).map((vehicle) => ({
        uuid: vehicle.uuid,
        brand: vehicle.brand,
        model: vehicle.model,
        buildYear: vehicle.build_year,
        image: vehicle.image,
        vin: vehicle.vin,
        description: vehicle.description,
      }));

      return res.status(200).json({
        success: true,
        message: "Vehicles fetched successfully",
        vehicles: parsedData,
      });
    } catch (error) {
      next(error);
    }
  },

  async saveVehicle(req, res, next) {
    try {
      console.log("Save vehicle. Req from: ", req.user);
      console.log("Body: ", req.body);

      const userUuid = req.user.userUuid;
      const customerUuid = req.body.customerUuid;
      const vehicleData = req.body.vehicleData;

      if (!vehicleData) throw new Error("Vehicle data is not provided");
      await checkInput(vehicleData);

      if (customerUuid) {
        var vehicleUuid = await vehicleService.saveVehicleByUserOrCustomerUuid(
          null,
          customerUuid,
          vehicleData
        );
      } else {
        var vehicleUuid = await vehicleService.saveVehicleByUserOrCustomerUuid(
          userUuid,
          null,
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

  async deleteVehicle(req, res, next) {
    try {
      console.log("Patch vehicle. Req from: ", req.user);
      console.log("Body: ", req.body);

      const userUuid = req.user.userUuid;
      const customerUuid = req.body.customerUuid;
      const vehicleUuid = req.body.vehicleUuid;

      if (!vehicleUuid) throw new Error("Vehicle uuid is not provided");

      if (customerUuid) {
        await vehicleService.deleteVehicleByUuid(
          null,
          customerUuid,
          vehicleUuid
        );
      } else {
        await vehicleService.deleteVehicleByUuid(userUuid, null, vehicleUuid);
      }

      return res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
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

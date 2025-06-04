const express = require("express");
const vehicleController = require("../controllers/vehicle");
const router = express.Router();

router.patch("/", vehicleController.patchVehicle);

module.exports = router;

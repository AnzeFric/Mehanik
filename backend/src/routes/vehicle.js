const express = require("express");
const vehicleController = require("../controllers/vehicle");
const router = express.Router();

router.post("/", vehicleController.saveVehicle);

router.patch("/", vehicleController.patchVehicle);

module.exports = router;

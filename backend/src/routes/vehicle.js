const express = require("express");
const vehicleController = require("../controllers/vehicle");
const router = express.Router();

// Return all customer vehicles, that the authorized mechanic saved
router.get("/", vehicleController.getMechanicCustomers);

module.exports = router;

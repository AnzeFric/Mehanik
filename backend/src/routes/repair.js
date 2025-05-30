const express = require("express");
const repairController = require("../controllers/repair");
const router = express.Router();

// Returns all customers, that the authorized mechanic worked on
router.get("/customers", repairController.getMechanicRepairedVehicles);

// Returns all repairs of the vehicle, that the authorized mechanic worked on
router.get("/repairs", repairController.getCustomerVehicleRepairs);

module.exports = router;

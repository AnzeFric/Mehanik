const express = require("express");
const repairController = require("../controllers/repair");
const router = express.Router();

// Returns all customer vehicles, that the authorized mechanic worked on
router.get("/vehicles", repairController.getMechanicRepairedVehicles);

// Returns all repairs of the vehicle, that the authorized mechanic worked on
router.get("/repairs", repairController.getCustomerVehicleRepairs);

module.exports = router;

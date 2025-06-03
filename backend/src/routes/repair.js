const express = require("express");
const repairController = require("../controllers/repair");
const router = express.Router();

// Returns an array of all repairs done to the vehicle, by vin
router.post("/get", repairController.getCustomerVehicleRepairs);

router.post("/save", repairController.saveCustomerVehicleRepair);

router.delete("/", repairController.deleteCustomerVehicleRepair);

module.exports = router;

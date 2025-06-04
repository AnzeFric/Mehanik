const customerController = require("../../controllers/accounts/customer");
const express = require("express");
const router = express.Router();

// Return all customers of the authorized mechanic
router.get("/", customerController.getCustomers);

router.delete("/", customerController.deleteCustomer);

// Save a new customer, their vehicle and optional repair
router.post("/", customerController.saveCustomerVehicleRepair);

router.patch("/", customerController.patchCustomerVehicle);

module.exports = router;

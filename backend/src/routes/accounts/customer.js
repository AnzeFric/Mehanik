const customerController = require("../../controllers/accounts/customer");
const express = require("express");
const router = express.Router();

// Return all customers of the authorized mechanic
router.get("/", customerController.getCustomers);

// Save a new customer, their vehicle and optional repair
router.post("/", customerController.saveCustomerVehicleRepair);

router.delete("/", customerController.deleteCustomer);

router.patch("/", customerController.patchCustomer);

module.exports = router;

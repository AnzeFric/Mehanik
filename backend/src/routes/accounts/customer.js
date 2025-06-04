const customerController = require("../../controllers/accounts/customer");
const express = require("express");
const router = express.Router();

// Return all customers of the authorized mechanic
router.get("/", customerController.getCustomers);

// Save new customer of the authorized mechanic
router.post("/", customerController.saveCustomer);

router.delete("/", customerController.deleteCustomer);

router.patch("/", customerController.patchCustomer);

module.exports = router;

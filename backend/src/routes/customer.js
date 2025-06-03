const express = require("express");
const customerController = require("../controllers/customer");
const router = express.Router();

// Return all customers of the authorized mechanic
router.get("/", customerController.getCustomers);

// Save new customer of the authorized mechanic
router.post("/", customerController.saveCustomer);

router.delete("/", customerController.deleteCustomer);

module.exports = router;

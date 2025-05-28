const express = require("express");
const repairController = require("../controllers/repair");
const router = express.Router();

router.get("/", repairController.getRepairedVehiclesByMechanic);

module.exports = router;

const express = require("express");
const repairController = require("../controllers/repair");
const router = express.Router();

// Returns an array of all repairs done to the vehicle, by uuid
router.post("/get", repairController.getRepairs);

router.post("/save", repairController.saveRepair);

router.delete("/", repairController.deleteRepair);

module.exports = router;

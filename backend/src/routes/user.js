const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

// Getting user by email
router.get("/", userController.me);

// Updating one. Using patch to only update the data provided. Put updates all data
router.patch("/", (req, res) => {});

// Deleteting/Disabling user by email
router.delete("/", userController.disable);

module.exports = router;

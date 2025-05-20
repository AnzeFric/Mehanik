const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

// Getting one
router.get("/", userController.me);

// Updating one. Using patch to only update the data provided. Put updates all data
router.patch("/", (req, res) => {});

// Deleteting/Deactivating one
router.delete("/", (req, res) => {});

module.exports = router;

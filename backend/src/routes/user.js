const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

// Getting one
router.get("/:email", (req, res) => {});

// Updating one. Using patch to only update the data provided. Put updates all data
router.patch("/:email", (req, res) => {});

// Deleteting/Deactivating one
router.delete("/:email", (req, res) => {});

module.exports = router;

const express = require("express");
const router = express.Router();

// Getting all
router.get("/", (req, res) => {});

// Getting one
router.get("/:email", (req, res) => {});

// Creating one
router.post("/", (req, res) => {});

// Updating one. Using patch to only update the data provided. Put updates all data
router.patch("/:email", (req, res) => {});

// Deleteting/Deactivating one
router.delete("/:email", (req, res) => {});

module.exports = router;

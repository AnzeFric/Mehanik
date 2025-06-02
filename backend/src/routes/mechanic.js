const express = require("express");
const mechanicController = require("../controllers/mechanic");
const router = express.Router();

// Returns an array of all mechanics, to display to user
router.get("/", mechanicController.getMechanics);

module.exports = router;

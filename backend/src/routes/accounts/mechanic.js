const mechanicController = require("../../controllers/accounts/mechanic");
const express = require("express");
const router = express.Router();

// Returns an array of all mechanics, to display to user
router.get("/", mechanicController.getMechanics);

module.exports = router;

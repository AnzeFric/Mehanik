const userController = require("../../controllers/accounts/user");
const express = require("express");
const router = express.Router();

// Fetching authorized user
router.get("/", userController.getUser);

// Returns an array of all mechanics, to display to user
router.get("/mechanics", userController.getMechanics);

// Updating authorized user by firstName and/or lastName
router.patch("/", userController.patchUser);

// Disabling authorized user
router.delete("/", userController.disableUser);

module.exports = router;

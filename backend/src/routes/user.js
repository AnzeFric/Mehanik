const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

// Fetching authorized user
router.get("/", userController.getUser);

// Updating authorized user by firstName and/or lastName
router.patch("/", userController.patchUser);

// Disabling authorized user
router.delete("/", userController.disableUser);

module.exports = router;

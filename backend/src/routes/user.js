const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

// Fetching authorized user
router.get("/", userController.me);

// Updating authorized user by firstName and/or lastName
router.patch("/", userController.update);

// Disabling authorized user
router.delete("/", userController.disable);

module.exports = router;

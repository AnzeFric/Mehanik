const express = require("express");
const notificationController = require("../controllers/notification");
const router = express.Router();

router.post("/", notificationController.savePushToken);

module.exports = router;

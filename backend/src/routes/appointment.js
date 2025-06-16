const express = require("express");
const appointmentController = require("../controllers/appointment");
const router = express.Router();

// Returns all appointments from authorized user
router.get("/", appointmentController.getAppointments);

router.post("/", appointmentController.saveAppointment);

// Updates status, userMessage or mechanicResponse
router.patch("/", appointmentController.updateAppointment);

module.exports = router;

const express = require("express");
const appointmentController = require("../controllers/appointment");
const router = express.Router();

// Returns all appointments from specified mechanic
// If the request sends mechanic with uuid, he gets all data
// If the request sends a normal user with mechanic email, he gets limited data
router.post("/get", appointmentController.getMechanicAppointments);

// Returns all user vehicles appointments
router.get("/", appointmentController.getUserAppointments);

router.post("/", appointmentController.saveAppointment);

// Updates status, dates, userMessage or mechanicResponse
router.patch("/", appointmentController.updateAppointment);

router.delete("/", appointmentController.deleteAppointment);

module.exports = router;

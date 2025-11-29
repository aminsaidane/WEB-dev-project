const express = require('express')
const router = express.Router();
const Appointment = require('../models/Appointment');
const {getAppointments, editAppointmentStatus, addAppointment} = require('../controllers/appointmentControllers')


router.get('/',getAppointments);




router.put("/:id/complete", editAppointmentStatus);



router.post("/", addAppointment);



module.exports = router
const express = require('express')
const router = express.Router();
const Vaccination = require('../models/Vaccination');
const {getVaccinations, editVAccinationStatus, addVaccination} = require('../controllers/vaccinationControllers')


router.get('/',getVaccinations);



router.put("/:id/complete",editVAccinationStatus);



router.post("/", addVaccination);



module.exports = router
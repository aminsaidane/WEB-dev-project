const express = require('express')
const router = express.Router();
const AddoptionApplication = require('../models/AddoptionApplication');
const {getApplications, getCurrentUserApplications, addApplication, editApplicationStatus} = require('../controllers/addoptionApplicationControllers')

router.get('/', getApplications);



router.get("/my", getCurrentUserApplications);



router.post("/", addApplication );



router.put("/:id", editApplicationStatus );



module.exports = router
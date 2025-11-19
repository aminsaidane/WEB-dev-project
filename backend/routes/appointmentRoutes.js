const express = require('express')
const router = express.Router();
const Appointment = require('../models/Appointment');

router.get('/',async (req,res)=>{
    try{
        const appointments = await Appointment.find().populate("animalId","name species")
        if(appointments){
            res.status(200).json({appointments:appointments})
        }else{
            res.status(404).json({msg:"No appointments Found"});
        }

    }catch(err){
        return res.status(500).json("Error fetching appointments")
    }
})


module.exports = router
const express = require('express')
const router = express.Router();
const Vaccination = require('../models/Vaccination');

router.get('/',async (req,res)=>{
    try{
        const vaccinations = await Vaccination.find().populate("animalId","name species")
        if(vaccinations){
            res.status(200).json({vaccinations:vaccinations})
        }else{
            res.status(404).json({msg:"No vaccinations Found"});
        }

    }catch(err){
        return res.status(500).json("Error fetching vaccinations")
    }
})


module.exports = router
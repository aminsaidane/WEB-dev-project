const express = require('express')
const router = express.Router();
const AddoptionApplication = require('../models/AddoptionApplication');


router.get('/',async (req,res)=>{
    try{
        const applications = await AddoptionApplication.find().populate("animalId","name species")
        if(applications){
            res.status(200).json({applications:applications})
        }else{
            res.status(404).json({msg:"No Applications Found"});
        }

    }catch(err){
        return res.status(500).json("Error fetching applications")
    }
})


module.exports = router
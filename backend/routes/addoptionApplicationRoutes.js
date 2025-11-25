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

    router.get("/my", async (req, res) => {
  try {
    const applications = await AddoptionApplication.find({ adopterId: req.user._id }).populate("animalId","name")
    res.json({ applications });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// POST /adoptions
router.post("/",  async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      age,
      address,
      homeType,
      experience,
      reason,
      otherPets,
      animalId
    } = req.body;

    const application = await AddoptionApplication.create({
      applicantName: fullName,
      applicantEmail: email,
      applicantPhone: phone,
      address,
      experience,
      homeType,
      hasOtherPets: !!otherPets,
      animalId,
      adopterId: req.user._id, // <-- current logged-in user
      status: "pending",
      submittedDate: new Date(),
      reason
    });

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit application" });
  }
});



module.exports = router
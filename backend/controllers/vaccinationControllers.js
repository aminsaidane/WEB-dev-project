const Vaccination = require('../models/Vaccination');





module.exports.getVaccinations = async (req,res)=>{
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
}

module.exports.editVAccinationStatus = async (req, res) => {
  try {
    const today = new Date();

   
    const formattedDate = today.toISOString().split("T")[0];
    const updated = await Vaccination.findByIdAndUpdate(
      req.params.id,
      { 
        status: "Completed",
        dateAdministered: formattedDate // OPTIONAL – auto set date
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Vaccination not found" });
    }

    res.json({
      message: "Vaccination marked as completed",
      vaccination: updated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports.addVaccination = async (req, res) => {
  try {
    const {
      animalId,
      vaccineName,
      dateAdministered,
      nextDueDate,
      veterinarian,
      vetId,
      batchNumber,
      status,
    } = req.body;

    // Validate required fields
    if (!animalId || !vaccineName || !dateAdministered) {
      return res.status(400).json({ error: "animalId, vaccineName, and dateAdministered are required" });
    }

    const vaccination = new Vaccination({
      animalId,
      vaccineName,
      dateAdministered,
      nextDueDate,
      veterinarian,
      vetId,
      batchNumber,
      status: status || "Due Soon", // default status
    });

    const savedVaccination = await vaccination.save();

    res.status(201).json(savedVaccination);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create vaccination" });
  }
}
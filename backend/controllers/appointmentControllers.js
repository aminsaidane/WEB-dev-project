const Appointment = require('../models/Appointment');




module.exports.getAppointments = async (req,res)=>{
    try{
        const appointments = await Appointment.find().populate("animalId",'name species')
        console.log(appointments)
        if(appointments){
            res.status(200).json({appointments:appointments})
        }else{
            res.status(404).json({msg:"No appointments Found"});
        }

    }catch(err){
        return res.status(500).json("Error fetching appointments")
    }
}
module.exports.editAppointmentStatus =  async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "Completed" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({
      message: "Appointment marked as completed",
      appointment: updated
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports.addAppointment = async (req, res) => {
  try {
    const {
      animalId,
      type,
      date,
      time,
      veterinarian,
      vetId,
      notes
    } = req.body;

    // Basic validation
    if (!animalId || !type || !date || !time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create appointment
    const newAppointment = new Appointment({
      animalId,
      type,
      date,
      time,
      veterinarian,
      vetId: vetId || null,     // optional
      notes: notes || "",
      status: "Scheduled"
    });

    // Save to DB
    const saved = await newAppointment.save();

    res.json(saved);

  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(500).json({ error: "Failed to create appointment" });
  }
}
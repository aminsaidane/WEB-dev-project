const mongoose = require('mongoose');
const {Schema} = mongoose

const appoinmentSchema = new Schema({ 
    type: String,
    date:String ,
    time:String ,
    veterinarian:String ,
    status:String ,
    notes:String,
    animalId: {
        type : Schema.Types.ObjectId,
        ref:"Animal"
    },
    vetId:{
        type :Schema.Types.ObjectId,
        ref:"User",
        required:false
    }
})


const Appointment = new mongoose.model("Appointment",appoinmentSchema);

module.exports = Appointment;
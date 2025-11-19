const mongoose = require('mongoose');
const {Schema} = mongoose

const vaccinationSchema = new Schema({ 
    id: String, 
    vaccineName: String,
    dateAdministered: String,
    nextDueDate: String,
    veterinarian: String,
    batchNumber: String,
    status: String,
     animalId:{
        type: Schema.Types.ObjectId,
        ref: "Animal"
     }  
})


const vaccination = new mongoose.model("vaccination",vaccinationSchema);

module.exports = vaccination;
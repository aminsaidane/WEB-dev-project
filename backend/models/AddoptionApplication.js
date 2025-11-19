const mongoose = require('mongoose');
const {Schema} = mongoose

const addoptionApplicationSchema = new Schema({ 
    applicantName: String,
    applicantEmail: String,
    applicantPhone: String,
    address: String,
    status:String,
    submittedDate: String,
    experience: String,
    homeType: String,
    hasOtherPets: Boolean,
    animalId: {
        type : Schema.Types.ObjectId,
        ref:"Animal"
    } 
})


const AddoptionApplication = new mongoose.model("AddoptionApplication",addoptionApplicationSchema);

module.exports = AddoptionApplication;
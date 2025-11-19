const mongoose = require('mongoose');
const {Schema} = mongoose

const animalSchema = new Schema({
    name: String,
    species: String ,
    breed: String,
    age: String,
    gender: String,
    weight: String,
    imageUrl: String,
    status: String,
    location: String,
    description: String,
    admissionDate: String,
    medicalHistory: [String],
    vaccinations: [String],
    temperament: [String]
})


const Animal = new mongoose.model("Animal",animalSchema);

module.exports = Animal;
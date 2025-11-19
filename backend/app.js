const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const animalRoutes = require('./routes/animalRoutes');
const addoptionApplicationroutes = require('./routes/addoptionApplicationRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const vaccinationRoutes = require('./routes/vaccinatioRoutes');
require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/shelterDB').then(()=>{
    console.log("connected to ShelterDB")
}).catch((err)=>{
    console.log(err);
});
app.use(cors())
app.use('/animals',animalRoutes);
app.use('/applications',addoptionApplicationroutes);
app.use('/appointments',appointmentRoutes)
app.use('/vaccinations',vaccinationRoutes);



app.listen(process.env.PORT,()=>{
    console.log("APP listening");
})
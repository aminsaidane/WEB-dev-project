const express = require('express');
const app = express();
const mongoose = require('mongoose');
const MongoStore = require("connect-mongo");
const cors = require('cors');
const animalRoutes = require('./routes/animalRoutes');
const addoptionApplicationroutes = require('./routes/addoptionApplicationRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const vaccinationRoutes = require('./routes/vaccinatioRoutes');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');
require('dotenv').config();

const session = require('express-session');
const passport = require('passport');
const { json } = require('stream/consumers');



mongoose.connect('mongodb://127.0.0.1:27017/shelterDB').then(()=>{
    console.log("connected to ShelterDB")
}).catch((err)=>{
    console.log(err);
});

//passport

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(session({
  secret: "your-secret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/shelterDB" }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

app.use(passport.initialize());
app.use(passport.session());

//other midlwares

app.use(cors({
  origin: "http://localhost:3000", // your React dev server
  credentials: true
}));
app.use(express.json());

app.use('/animals',animalRoutes);
app.use('/applications',addoptionApplicationroutes);
app.use('/appointments',appointmentRoutes)
app.use('/vaccinations',vaccinationRoutes);
app.use('/auth', userRoutes)
/* ===========================
   CREATE MOCK USER (TEST ONLY)
   =========================== */
app.get("/mock", async (req, res) => {
  try {
    const user = new User({
      fullName: "Amine Saidane",
      email: "aminsaidane77@gmail.com",
      role: "adopter",
    });

    // For test users: directly set password using setPassword()
    await user.setPassword("aminsaidane2020"); // passport-local-mongoose helper

    await user.save();

    res.json({
      message: "Mock user created successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(process.env.PORT,()=>{
    console.log("APP listening");
})
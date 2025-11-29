const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const {regiter,login, logout, getCurrentUser, getAllUsers, getVets, addUser, editUser ,deleteUser } = require('../controllers/userControllers')
const router = express.Router();


router.post("/signup", regiter );


router.post("/login", login);



router.post("/logout",logout );



router.get("/me", getCurrentUser );



router.get('/users', getAllUsers );



router.delete('/users/:id', deleteUser );



router.get("/vets", getVets);



router.post("/users", addUser);



router.put("/users/:id", editUser);



module.exports = router;

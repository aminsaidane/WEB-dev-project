const express = require("express");
const router = express.Router()
const Animal = require('../models/Animal')
const User = require('../models/User');
const {getAllAnimals, getAnimal , addAnimal, editAnimal, deleteAnimal, getCurrentUserFavoriteAnimals, AddCurrentUserFavoriteAnimal, RemoveCurrentUserFavoriteAnimal} = require('../controllers/animalControllers')



router.get('/', getAllAnimals )



router.get('/:id', getAnimal)



router.post('/', addAnimal)



router.put('/:id', editAnimal)



router.delete('/:id', deleteAnimal);



router.get("/favorites/my",getCurrentUserFavoriteAnimals);



router.put("/:animalId/favoriteAnimals", AddCurrentUserFavoriteAnimal );



router.delete("/:animalId/favoriteAnimals", RemoveCurrentUserFavoriteAnimal );



module.exports = router
const express = require("express");
const router = express.Router()
const Animal = require('../models/Animal')


router.get('/', async (req,res)=>{
    try{
        const animals = await Animal.find({});
        if(animals){
            return res.status(200).json({animals:animals});
        }else{
            return res.status(404).json({msg:"No Animals found"});
        }
    }catch(err){
       return res.status(500).json({msg:"Error fetching Animals"});
    }
})
router.get('/:id', async (req, res) => {
const animalId = req.params.id;
try{
    const foundAnimal = await Animal.findById(animalId);
    if(foundAnimal){
         res.status(200).json({user:foundAnimal})
    }else{
        res.status(404).json({msg:"No animal found"})
    }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"error retrieving the Animal"})
    }  
}
)


router.post('/',async(req, res) => {
const animal = req.body;
try{
    const foundAnimal = await Animal.findOne({name:animal.name})
    if(foundAnimal){
        res.status(400).json({msg:"animal already exist"})
    }else{
        const newAnimal = new Animal(animal)
        console.log(newAnimal)
        await Animal.save();
        res.status(200).json({animal:newAnimal, msg:"User added successfully"})
    }
}catch(err){
    console.log(err);
    res.status(500).json({msg:"error adding Animal"})
}
})

router.put('/:id', async (req, res) => {
const animalId = req.params.id;
const updates = req.body;
try{
    await Animal.findByIdAndUpdate(animalId,updates);
    res.status(200).json({msg:"update successful"})
}catch(err){
    console.log(err);
    res.status(500).json({msg:"error updating Animal"})
}
})

router.delete('/:id',async(req,res) =>{
    const animalId = req.params.id
    try{
        await Animal.findByIdAndDelete(animalId)
        res.status(200).json({msg:"animal deleted successfulyy"})
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"error deleting Animal"})
    }
}
)






module.exports = router
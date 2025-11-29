const Animal = require('../models/Animal')
const User = require('../models/User');


module.exports.getAllAnimals = async (req,res)=>{
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
}




module.exports.getAnimal =  async (req, res) => {
const animalId = req.params.id;
try{
    const foundAnimal = await Animal.findById(animalId);
    if(foundAnimal){
         res.status(200).json({animal:foundAnimal})
    }else{
        res.status(404).json({msg:"No animal found"})
    }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"error retrieving the Animal"})
    }  
}




module.exports.addAnimal = async(req, res) => {
const animal = req.body;
try{
    const foundAnimal = await Animal.findOne({name:animal.name})
    if(foundAnimal){
        res.status(400).json({msg:"animal already exist"})
    }else{
        const newAnimal = new Animal(animal)
        console.log(newAnimal)
        await newAnimal.save();
        res.status(200).json({animal:newAnimal, msg:"User added successfully"})
    }
}catch(err){
    console.log(err);
    res.status(500).json({msg:"error adding Animal"})
}
}





module.exports.editAnimal =  async (req, res) => {
const animalId = req.params.id;
const updates = req.body;
try{
   const updatedAniaml= await Animal.findByIdAndUpdate(animalId,updates,{new:true});
    res.status(200).json({animal:updatedAniaml, msg:"update successful"})
}catch(err){
    console.log(err);
    res.status(500).json({msg:"error updating Animal"})
}
}





module.exports.deleteAnimal = async(req,res) =>{
    const animalId = req.params.id
    try{
        await Animal.findByIdAndDelete(animalId)
        res.status(200).json({msg:"animal deleted successfulyy"})
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"error deleting Animal"})
    }
}





module.exports.getCurrentUserFavoriteAnimals =  async (req, res) => {
  try {
    const userId = req.user._id; // or however you store logged-in user
    console.log(userId)
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // fetch user and populate favoriteAnimals
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // return the favorite animals
    res.json({ favoriteAnimalIds: user.favoriteAnimals });
  } catch (err) {
    console.error("Error fetching favorites:", err);
    res.status(500).json({ message: "Server error" });
  }
}





module.exports.AddCurrentUserFavoriteAnimal = async (req, res) => {
  try {
    const userId = req.user._id;
    const { animalId } = req.params;
    console.log(animalId)
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Add to favorites only if not already present
    if (!user.favoriteAnimals.includes(animalId)) {
      user.favoriteAnimals.push(animalId);
      await user.save();
    }

    res.json({ favoriteAnimalIds: user.favoriteAnimals });
  } catch (err) {
    console.error("Error adding favorite animal:", err);
    res.status(500).json({ message: "Server error" });
  }
}






module.exports.RemoveCurrentUserFavoriteAnimal = async (req, res) => {
  try {
    const userId = req.user._id;
    const { animalId } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Remove animalId if it exists
    user.favoriteAnimals = user.favoriteAnimals.filter(
      (id) => id.toString() !== animalId
    );

    await user.save();

    res.json({ favoriteAnimalIds: user.favoriteAnimals });
  } catch (err) {
    console.error("Error removing favorite animal:", err);
    res.status(500).json({ message: "Server error" });
  }
}







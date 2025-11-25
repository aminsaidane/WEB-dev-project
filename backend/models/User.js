const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
const {Schema} = mongoose;


const userSchema = new Schema({
    fullName:{
        type:String,
        required:true
    },
    role: {
    type: String,
    enum: ["adopter", "vet", "shelter", "admin"],
    default: "adopter"
  },
favoriteAnimals: [
    { type: Schema.Types.ObjectId, ref: "Animal" }
  ],
});

userSchema.plugin(plm, {
  usernameField: "email" // Use email instead of username
});

const User= mongoose.model("User", userSchema);
module.exports = User;

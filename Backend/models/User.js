const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://abhinav0298:eragon352@cluster0.za8liym.mongodb.net/?retryWrites=true&w=majority')

const userSchema = new mongoose.Schema({

  userEmail: String,
  userPassword:String,
  firstName: String,
  lastName: String,
  userType: { type: String, enum: ['volunteer', 'non-volunteer'], default: 'non-volunteer' },
  profilePic: String, // Add a field for storing the profile picture URL
});


 userInfo = mongoose.model("users",userSchema)
module.exports = userInfo
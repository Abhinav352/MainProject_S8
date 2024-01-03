const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://abhinav0298:eragon352@cluster0.za8liym.mongodb.net/?retryWrites=true&w=majority')
const Schema = mongoose.Schema
const userSchema = new Schema({
    userEmail:String,
    userName:String,
    userFullName:String,
    userPassword:String,
    userType: { type: String, enum: ['volunteer', 'non-volunteer'], default: 'non-volunteer' },
})

userInfo = mongoose.model("users",userSchema)
module.exports = userInfo
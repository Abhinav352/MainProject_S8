const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
require("dotenv").config();

const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
  const { userEmail, userPassword, userType } = request.body
    console.log(userEmail)
  try{
  const user = await User.findOne({ userEmail : userEmail })
  console.log(`the user is ${user}`)
  //console.log(`the password is ${user.userPassword}`)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(userPassword, user.userPassword)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  console.log("password is valid")

  const userForToken = {
    userEmail: user.userEmail,
    id: user._id,
    userType: user.userType,
  
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, user: user})
    }
  
    catch(err){
      console.log(err)
    }
})

module.exports = loginRouter
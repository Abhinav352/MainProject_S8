const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', async (request, response) => {
  let { userEmail, userPassword, userType, firstName, lastName } = request.body;

  const saltRounds = 10;
  userPassword = await bcrypt.hash(userPassword, saltRounds);
  
  const user = new User({
    userEmail,
    userPassword,
    userType,
    firstName,
    lastName,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter
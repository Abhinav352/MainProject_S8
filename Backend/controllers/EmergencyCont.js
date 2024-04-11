const nodemailer = require('nodemailer');
const EmergencyModel = require('../models/Emergency');
const UserModel = require('../models/User'); // Assuming you have a User model

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'rapidaidnetwork@gmail.com', // Your email address
    pass: 'iagr nmox ivuk pcdo' // Your email password
  }
});

const submitEmergency = async (req, res) => {
  try {
    const { latitude, longitude ,country,state} = req.body;

    // Create a new Emergency document using the model
    const newEmergency = new EmergencyModel({ latitude, longitude, country, state });

    // Save the document to the database
    await newEmergency.save();
const userType='volunteer'
    // Fetch all users' emails (You need to have a User model and adjust this part accordingly)
    const users = await UserModel.find({userType}, 'userEmail'); // Fetch userEmail instead of email
    const emails = users.map(user => user.userEmail); // Access userEmail field

    // Send email notification to all users
    await transporter.sendMail({
      from: 'Rapid Aid Network',
      to: emails.join(', '), // Send to all users
      subject: 'New Emergency Alert',
      text: `A new emergency has been reported in the State of ${state},${country} . Please check the emergency list for more details.`
    });

    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllEmergency = async (req, res) => {
  try {
    // Fetch all requests from the database
    const emergency = await EmergencyModel.find();

    res.status(200).json(emergency);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  submitEmergency,
  getAllEmergency,
};
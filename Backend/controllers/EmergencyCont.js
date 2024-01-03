const EmergencyModel = require('../models/Emergency');

const submitEmergency = async (req, res) => {
  try {
    const { latitude,longitude } = req.body;

    // Create a new Request document using the model
    const newEmergency = new EmergencyModel({ latitude,longitude });

    // Save the document to the database
    await newEmergency.save();

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
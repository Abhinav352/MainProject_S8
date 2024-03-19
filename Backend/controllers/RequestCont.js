const RequestModel = require('../models/Request');

const submitRequest = async (req, res) => {
  try {
    const { itemType, description, username,email } = req.body;

    // Create a new Request document using the model
    const newRequest = new RequestModel({ itemType, description, username,email });

    // Save the document to the database
    await newRequest.save();

    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getAllRequests = async (req, res) => {
  try {
    // Fetch all requests from the database
    const requests = await RequestModel.find();

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getOneRequest = async (req, res) => {
  try {
    const emailFilter = req.query.email;

    // If an email is provided, filter requests by email
    const query = emailFilter ? { email: emailFilter } : {};

    const requests = await RequestModel.find(query);

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const deleteRequest = async (req, res) => {
  try {
    const requestId = req.params.id;

    // Find the request by ID and delete it
    await RequestModel.findByIdAndDelete(requestId);

    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = {
  submitRequest,
  getAllRequests,
  deleteRequest,
  getOneRequest,
};
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  itemType: String,
  description: String,
  username: String,
  email:String,
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
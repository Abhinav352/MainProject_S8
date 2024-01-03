const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  itemType: String,
  quantity: Number,
  username: String,
  email:String,
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
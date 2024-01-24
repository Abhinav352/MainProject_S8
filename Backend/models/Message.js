const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  roomId: String, // Add this field
  sender: String,
  text: String,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
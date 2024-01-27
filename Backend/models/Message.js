const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  roomId: String,
  sender: String,
  text: String,
}, { timestamps: true }); // Add timestamps option

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
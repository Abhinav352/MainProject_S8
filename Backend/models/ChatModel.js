const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
 chatId: String,
 senderId: String,
 receiverId: String,
 message: String,
 timestamp: Date
});

module.exports = mongoose.model('Chat', ChatSchema);
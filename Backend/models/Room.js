const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: String,
  user1: String,
  user2: String,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
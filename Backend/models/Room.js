const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: String,
  user1: String,
  user2: String,
  userName1: String, // Include userName1 in the schema
  userName2: String, // Include userName2 in the schema
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
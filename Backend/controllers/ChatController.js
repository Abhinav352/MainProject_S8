const Message = require('../models/Message');

const getMessages = (socket) => {
  Message.find({}, (err, messages) => {
    if (err) {
      console.error(err);
    } else {
      socket.emit('getMessages', messages);
    }
  });
};

const sendMessage = (io, message) => {
  const newMessage = new Message(message);
  newMessage.save((err, savedMessage) => {
    if (err) {
      console.error(err);
    } else {
      io.emit('receiveMessage', savedMessage);
    }
  });
};

module.exports = { getMessages, sendMessage };
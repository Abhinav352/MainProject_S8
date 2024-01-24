const Message = require('../models/Message');

const MessageContt = {
  getRecentChats: async (req, res) => {
    try {
      const recentChats = await Message.distinct('roomId');
      res.json(recentChats.map((roomId) => ({ roomId })));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getMessagesByRoomId: async (req, res) => {
    try {
      const messages = await Message.find({ roomId: req.params.roomId });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  sendMessage: async (req, res) => {
    try {
      const { roomId } = req.params;
      const { text } = req.body;
      const sender = 'current_user';
      const receiver = req.body.receiver || sender;
  
      const newMessage = new Message({ roomId, sender, text });
      await newMessage.save();
  
      req.app.io.emit('message', newMessage);
      res.json(newMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = MessageContt;
const ChatModel = require('../models/ChatModel');

exports.createChatRoom = async (req, res) => {
  try {
    const { requesterEmail, currentUserEmail } = req.body;

    // Generate a unique room name based on requester's and current user's emails
    const room = generateRoomName(currentUserEmail, requesterEmail);

    const existingChat = await ChatModel.findOne({ room });
    if (existingChat) {
      return res.status(400).json({ message: 'Chat room already exists' });
    }

    const newChat = new ChatModel({ room, messages: [] });
    await newChat.save();

    res.status(201).json({ room });
  } catch (error) {
    console.error('Error creating chat room:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const room = generateRoomName(req.user.userEmail, req.params.otherUserEmail);

    const chat = await ChatModel.findOne({ room });
    if (!chat) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    res.status(200).json(chat.messages);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

function generateRoomName(email1, email2) {
  // Sort emails to ensure consistency
  const sortedEmails = [email1, email2].sort();
  return `${sortedEmails[0]}_${sortedEmails[1]}`;
}
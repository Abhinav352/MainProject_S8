const express = require('express');
const signupRouter = require('./controllers/register');
const loginRouter = require('./controllers/login');
const RequestController = require('./controllers/RequestCont');
const cors = require('cors');
const Emergency = require('./controllers/EmergencyCont');
const messagesRouter = require('./controllers/messages');
const http = require('http');
const socketIO = require('socket.io');
const Message = require('./models/Message');
const messageController = require('./controllers/MessageContt');
const { v4: uuidv4 } = require('uuid');
const Room = require('./models/Room');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  const result = await Message.find();
  console.log(result);
  res.json(result);
});

app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.post('/requests', RequestController.submitRequest);
app.get('/requests', RequestController.getAllRequests); 
app.delete('/requests/:id', RequestController.deleteRequest);
app.get('/pend/requests', RequestController.getOneRequest);
app.post('/emergency', Emergency.submitEmergency);
app.get('/emergency', Emergency.getAllEmergency);
app.get('/messages/recent', messageController.getRecentChats);
app.get('/messages/:roomId', messageController.getMessagesByRoomId);
app.post('/messages/:roomId', messageController.sendMessage);
app.post('/createRoom', async (req, res) => {
  try {
    const { user1, user2 } = req.body;

    // Check if a room with the given user emails already exists
    const existingRoom = await Room.findOne({ $or: [{ user1, user2 }, { user1: user2, user2: user1 }] });

    if (existingRoom) {
      // Room already exists, return its ID
      res.json({ roomId: existingRoom.roomId });
    } else {
      // Generate a unique room ID
      const roomId = uuidv4();

      // Store room ID and user emails in MongoDB
      const roomData = { roomId, user1, user2 };
      const result = await Room.create(roomData);

      res.json({ roomId });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/room/:roomId', async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.roomId });

    if (room) {
      res.json({ user1: room.user1, user2: room.user2 });
    } else {
      res.status(404).json({ error: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/rooms/:userEmail', async (req, res) => {
  try {
    const { userEmail } = req.params;

    // Find all rooms where the current user is either user1 or user2
    const userRooms = await Room.find({ $or: [{ user1: userEmail }, { user2: userEmail }] });

    res.json(userRooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.io = io;

// Socket.io setup
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle new messages
  socket.on('sendMessage', async ({ roomId, sender, text }) => {
    const newMessage = new Message({ roomId, sender, text });
    await newMessage.save();
    io.emit('message', newMessage);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
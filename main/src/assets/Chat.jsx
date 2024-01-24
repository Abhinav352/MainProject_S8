// Import necessary modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000', { transports: ['websocket'] });

const Chat = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomDetails, setRoomDetails] = useState({});
  const currentUserEmail = localStorage.getItem('userEmail'); // Retrieve current user's email from local storage
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/messages/${roomId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error.message);
      }
    };

    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/room/${roomId}`);
        setRoomDetails(response.data);
        console.log('Room Details:', response.data); // Log room details
      } catch (error) {
        console.error('Error fetching room details:', error.message);
      }
    };

    fetchMessages();
    fetchRoomDetails();

    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('message');
    };
  }, [roomId]);

  const handleSendMessage = () => {
    if (roomDetails.user1 && roomDetails.user2) {
      console.log('User 1:', roomDetails.user1);
      console.log('User 2:', roomDetails.user2);
      
      // You can emit the message using socket.io here
      socket.emit('sendMessage', { roomId, sender: currentUserEmail, text: newMessage }); // Pass sender email
      setNewMessage('');
    } else {
      console.error('Users not set.');
    }
  };

  return (
    <div>
      <h2>Chat in Room {roomId}</h2>
      <div>
        {messages.map((message) => (
          <div key={message._id}>
            <strong>{message.sender === currentUserEmail ? 'You' : (message.sender === roomDetails.user1 ? roomDetails.user1 : roomDetails.user2)}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
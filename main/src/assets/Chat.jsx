import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Chat.css';

const socket = io('http://localhost:5000', { transports: ['websocket'] });

const Chat = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomDetails, setRoomDetails] = useState({});
  const currentUserEmail = localStorage.getItem('userEmail');
  const currentUserName = localStorage.getItem('userName');
  
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
        console.log('Room Details:', response.data);
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
      
      socket.emit('sendMessage', { roomId: roomId, sender: currentUserEmail, senderName: currentUserName, text: newMessage });
      setNewMessage('');
    } else {
      console.error('Users not set.');
    }
  };

  return (
    <div className="chat-container">
      
      <div className="messages-container">
        {messages.map((message) => (
          <div
          key={message._id}
          className={`message ${
            message.sender === currentUserEmail ? 'sent' : 'received'
          }`}
        >
          
            <div className='texty'>{message.text}</div>
            
            <span className="message-time">
              {new Date(message.createdAt).toLocaleTimeString(undefined,{
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>
        <i className="fa fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;
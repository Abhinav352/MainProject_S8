// Import React and necessary components
import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import axios from 'axios';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
const user = localStorage.getItem("userEmail")
  useEffect(() => {
    // Fetch messages from the backend when the component mounts
    axios.get('/messages')
      .then(response => setMessages(response.data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      // Send the new message to the backend using Axios
      axios.post('/messages', { text: newMessage, sender: user })
        .then(response => setMessages([...messages, response.data]))
        .catch(error => console.error('Error sending message:', error));

      setNewMessage('');
    }
  };

  return (
    <div>
      <h1>Instagram Chat Clone</h1>
      <ChatWindow messages={messages} onSendMessage={handleSendMessage} newMessage={newMessage} setNewMessage={setNewMessage} />
    </div>
  );
}

export default Chat;
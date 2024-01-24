import React, { useState } from 'react';

const SendMessageForm = ({ socket, currentUser, recipientUser }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() !== '') {
      socket.emit('privateMessage', {
        sender: currentUser,
        recipient: recipientUser,
        text: message,
      });
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Send a Message</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SendMessageForm;
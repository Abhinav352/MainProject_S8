import React from 'react';

function ChatWindow({ messages, onSendMessage, newMessage, setNewMessage }) {

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div>
      <div style={{ border: '1px solid #ccc', minHeight: '200px', padding: '10px', marginBottom: '10px' }}>
        {Array.isArray(messages) ? (
          messages.map((message, index) => (
            <div key={index}>{message.sender}: {message.text}</div>
          ))
        ) : (
          <div>No messages available</div>
        )}
      </div>
      <div>
        <input type="text" value={newMessage} onChange={handleInputChange} />
        <button onClick={onSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
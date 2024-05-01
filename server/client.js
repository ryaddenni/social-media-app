import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000'; // replace with your server address

function Chat() {
  const [response, setResponse] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('newMessage', (message) => {
      setResponse(message.Content); // assuming message object has a Content property
    });
  }, []);

  const sendMessage = () => {
    // replace with your sendMessageToConversation API endpoint
    fetch('http://localhost:5000/conversations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ChatId: 'your_chat_id',
        SenderId: 'your_sender_id',
        Content: message,
        otherUserId: 'other_user_id',
      }),
    });
  };

  return (
    <div>
      <p>New Message: {response}</p>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default Chat;

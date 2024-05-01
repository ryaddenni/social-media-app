import React, { useState } from 'react';
import axios from 'axios';

function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const sendMessage = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      await axios.post('YOUR_API_ENDPOINT', {
        ChatId: 'your_chat_id',
        SenderId: 'your_sender_id',
        Content: message,
        otherUserId: 'other_user_id',
      });
      // Clear message input after successful send
      setMessage('');
      setError('');
    } catch (error) {
      setError('Error sending message');
    }
  };

  return (
    <div>
      <h2>Send Message to Conversation</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <textarea
        rows="4"
        cols="50"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <br />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default SendMessageForm;

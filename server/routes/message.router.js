import express from 'express';
import http from 'http';
import { Server as socketIo } from 'socket.io';
import { setupSocketIO, sendMessageToConversation, fetchConversationMessages } from '../controllers/conversation.controller.js';

const app = express();
const server = http.createServer(app);
const io = setupSocketIO(server);

// Parse JSON bodies
app.use(express.json());

// Route to send a message to a conversation
app.post('/conversation/send-message', sendMessageToConversation);

// Route to fetch messages of a conversation
app.get('/conversation/messages/:conversationId', fetchConversationMessages);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

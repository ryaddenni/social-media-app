import express from 'express';
import http from 'http';
import path from 'path';
import { Server as socketIo } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new socketIo(server);
const __dirname = path.resolve();

app.get('/', (req, res) => {
  // Corrected path to the HTML file
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Socket.io events
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for messages from clients
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

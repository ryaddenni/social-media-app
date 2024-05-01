import io from 'socket.io-client';
const socket = io();

socket.on('connection', () => {
    console.log('Connected to the server');

    
    socket.emit('newMessage', {
        SenderId: 'testSenderId',
        Content: 'testContent',
        ReceiverId: 'testReceiverId'
    });
});

socket.on('NewMessage', (message) => {
    console.log('Received new message:', message);
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});

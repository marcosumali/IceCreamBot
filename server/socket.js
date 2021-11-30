const express = require ('express');

const {apiCall} = require('./helper/utils');

const PORT = process.env.SOCKET_PORT || 5000;
const CUSTOMER_SENDER_ID = 'Customer';
const API_ENDPOINT = 'http://localhost:3000/api';

// Create an Express application. 
const app = express();

// Binds and listens for connections on the specified host and port. 
const server = app.listen(PORT, () => console.log(`Websocket is listening at http://localhost:${PORT}`));

// Create socket instance and binds it with server
const io = require('socket.io')(server, {
  cors: {
    origin: ["http://localhost:8081"]
  }
});

// Enables connection to websocket
io.on('connection', (socket) => {
  const messageUrl = `${API_ENDPOINT}/messages`

  console.log('A user connected: ', socket.id);

  socket.on('disconnect', () => {
    console.log('A user disconnected: ', socket.id);
  });

  socket.on('send-message', async ({message, room}) => {
    // Broadcast message
    if (!room || room === '') {
      socket.emit('receive-message', message);
    }

    // Send messages to all recipients on specific room
    if (room) {
      io.in(room).emit('receive-message', message);
    } 

    // Save message to server
    try {
      const newMessage = {text: message, fileUrl: '', sessionId: room, senderId: CUSTOMER_SENDER_ID}
      await apiCall(messageUrl, 'POST', newMessage)
    } catch (error) {
      console.log('ERROR:socket', error)
    }
  });

  socket.on('join-room', room => {
    socket.join(room)
  });

  socket.on('leave-room', room => {
    socket.leave(room)
  });
});

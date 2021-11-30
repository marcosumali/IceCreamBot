const {Server} = require("socket.io");

const PORT = process.env.SOCKET_PORT || 5000;

const io = new Server(PORT, {
  cors: {
    origin: ["http://localhost:8081"]
  }
})

// Enables connection to websocket
io.on('connection', (socket) => {
  console.log('A user connected: ', socket.id);

  socket.on('disconnect', () => {
    console.log('A user disconnected: ', socket.id);
  });

  socket.on('send-message', (message, room) => {
    // Broadcast message
    if (!room || room === '') {
      socket.emit('receive-message', message);
    }

    // Send messages to all recipients on specific room
    if (room) {
      io.in(room).emit('receive-message', message);
    } 
  });

  socket.on('join-room', room => {
    socket.join(room)
  });

  socket.on('leave-room', room => {
    socket.leave(room)
  });
});

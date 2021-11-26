const PORT = process.env.SOCKET_PORT || 5000;

const io = require("socket.io")(PORT, {
  cors: {
    origin: "http://localhost:8080"
  }
});

// Enables connection to websocket
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('hello', 'hello world')
});

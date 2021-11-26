const socket = io('http://localhost:5000');

socket.on('hello', data => {
  console.log('HELLO:', data)
})
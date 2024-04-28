const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle offer from client
  socket.on("offer", (offer) => {
    // Broadcast offer to all other clients except the sender
    socket.broadcast.emit("offer", offer);
  });

  // Handle answer from client
  socket.on("answer", (answer) => {
    // Broadcast answer to all other clients except the sender
    socket.broadcast.emit("answer", answer);
  });

  // Handle ICE candidate from client
  socket.on("candidate", (candidate) => {
    // Broadcast ICE candidate to all other clients except the sender
    socket.broadcast.emit("candidate", candidate);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

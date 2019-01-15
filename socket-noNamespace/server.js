const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 4000;
const axios = require('axios');

const socketio = require('socket.io');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
// app.use(routes);

// Connect to the Mongo DB
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/gamedb"
// );

// Adding Classes
const Player = require('./classes/Player')

// Global Variables
let player = {};
let players = [];

// Start the API server
const expressServer = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = socketio(expressServer);

// Connection with socket server
io.on('connection', socket => {

  socket.emit('MSG From Server', {
    message: `Welcome to the socketio server! Your SocketID: ${socket.id}`,
    socketid: socket.id
  });

  socket.on('MSG To Server', dataFromClient => {
    console.log(dataFromClient.message);
  });

  // Logining In
  socket.on('LOGIN', playerName => {
    if (playerName.length === 0) {
      return socket.emit('LOGIN_ERROR', 'Name is required.')
    }

    player = new Player(socket.id, playerName, 0);

    players.push(player);

    socket.emit('LOGIN_SUCCESS', player);

    socket.join('Room 1', () => {
      let rooms = Object.keys(socket.rooms);
      console.log(rooms); // [ <socket.id>, 'room 237' ]    
      io.to('Room 1').emit('ROOM_JOIN_SUCCESS', `${playerName} has joined the room`); // broadcast to everyone in the room
    });

    io.to('Room 1').emit('Number of Players', players.length)
  })

  socket.on('disconnect', function () {
    console.log('SocketID: ' + socket.id + ' disconnected');
  });

})





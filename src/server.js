'use strict';

//express server
const {Server} = require('socket.io');
const cors = require('cors');
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
// const io = require('socket.io')(httpServer, {});
const server = new Server(3001, {cors:{origin:['http://localhost:3002'], methods:['GET']}});

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./routes/auth/routes.js');
const v2Routes = require('./routes/v2');

//socketServer
const chat = server.of('/chat');

chat.on('connection', (socket) => {
  //room message of user joining room
  socket.on('joinRoom', ({ username, roomname }) => {
    //* create user;
    server.emit('joinedRoom', `${username} has joined the ${roomname}`);
  });
  //chat message sent;
  socket.on('chat', (data) => {
    console.log(data);
    chat.emit('chat', data);
  });


  // user message when leaving room;
  socket.on('disconnect', (id) => {
    console.log(id);
    server.emit(`${id} has left the room`);
  });

});
// app Level MW
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);
app.use('/api/v2', v2Routes);

// Catchalls
app.use(notFound);
app.use(errorHandler);

// Export
module.exports = {
  server: httpServer,
  start: (port) => {
    httpServer.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};

//removed code...delete if not used.;
// socket.on('delivered', (data) => {
//   console.log(data);
//   server.emit('delivered', data);
// });
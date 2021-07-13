'use strict';


// const MessageQueue = require('./queue-server.js')
const io = require('socket.io');
// let sendMessage = new MessageQueue();


const server = io(3000);
const chat = server.of('/chat');

chat.on('connection', (socket) => {
  //room message of user joining room
  socket.on('joinRoom', ({ username, roomname }) => {
    //* create user;
    const p_user = join_User(socket.id, username, roomname);
    console.log(socket.id, '=id');
    socket.join(p_user.room);
  });
  //chat message sent;
  socket.on('chat', (data) => {
    console.log(data);
    server.emit('chat', data);
  });


  // user message when leaving room;
  socket.on('disconnect', (id) => {
    console.log(id);
    server.emit(`${id} has left the room`);
  });

});

//removed code...delete if not used.;
// socket.on('delivered', (data) => {
//   console.log(data);
//   server.emit('delivered', data);
// });
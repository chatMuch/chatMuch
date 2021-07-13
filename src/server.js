'use strict';

// // 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./routes/auth/routes.js');
const v2Routes = require('./routes/v2');

const MessageQueue = require('./queue-server.js')
const io = require('socket.io');
let sendMessage = new MessageQueue();


const server = io(3000);
const caps = server.of('/caps');

caps.on('connection', (socket) => {

  socket.on("joinRoom", ({ username, roomname }) => {
    //* create user
    const p_user = join_User(socket.id, username, roomname);
    console.log(socket.id, "=id");
    socket.join(p_user.room);
  };
  
    socket.on('sent', (data) =>{
      console.log(data);
    sendMessage.add(data);
    server.emit('sent', data);
  });

  socket.on('delivered', (data) => {
    console.log(data);
    server.emit('delivered', data);
  });
});

socket.on(MessageQueue, (messages) => {
  console.log(data);
  server.emit(MessageQueue, messages);
});

})
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

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
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
  // Potential Timeout or failed to deliver function
  // socket.on('in-transit', (data) => {
  //   console.log(data);
  //   server.emit('in-transit', data);
  // });

  // socket.on('received', (data) => {
  //   console.log(data);
  //   sendMessage.received(data);
  // });

  // socket.on('getAll', () => {
  //   const obtain = sendMessage.get();
  //   for(let i = 0; i<obtain.length; i++){
  //     // socket.broadcast.emit[o]
  //     console.log(obtain[i], 'Got It');
  //   }
const express = require('express');
//Bring the socket.io module
const app = express();
const PORT = 5050;
//Create a httpServer
const httpServer = app.listen(PORT);
const { Server} = require('socket.io');

//Create a new instance of Socket.io Server
const ioServer = new Server(httpServer);

const staticController = express.static('public-controller');
const staticDisplay = express.static('public-display');

app.use('/controller', staticController);
app.use('/display', staticDisplay);

//Set the ioServer to listen to new connections
//Set the socket to listen to an event and the message from controller
//Broadcast the message to the display
ioServer.on('connection', (socket) => {
    console.log(`Connected`, socket.id);

    socket.on(`directions`, (controllerOrder) => {
        console.log(controllerOrder);
        socket.broadcast.emit('directions', controllerOrder);
    });

    socket.on('screens', (pantalla) => {
        console.log(pantalla)
        socket.broadcast.emit('screens', pantalla);
    });

   socket.on('screensController', (pantalla) => {
    console.log('controler', pantalla)
    socket.broadcast.emit('screensController', pantalla);
    });
});
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const redis = require('socket.io-redis');
const path = require('path');

const redis_url = process.env.REDIS_URL || 'localhost'
const redis_port = process.env.REDIS_PORT || 6379
const port = process.env.PORT || 3000;

const randomWords = require('random-words');

const nodeId = randomWords()
console.log(nodeId)

io.adapter(redis({ host: redis_url, port: redis_port }));

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    io.emit("message", {message: "User joined.", node: nodeId})
    socket.on("message", (message) => {
        io.emit("message", {message: message, node: nodeId})
    })
    socket.on('disconnect', () => {
        io.emit("message", {message: "User left", node: nodeId})
    })
});
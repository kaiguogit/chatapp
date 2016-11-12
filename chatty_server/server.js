// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Broadcast to all.
wss.broadcast = function broadcast(type, data) {
    var response = {
        type: type,
        data: data
    };
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(response));
    });
};

var messages = [
    {
        username: "user1",
        content: "message1"
    }
];
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => console.log('Client disconnected'));

    // Set up a callback when message is received.
    ws.on('message', function incoming(request) {
        console.log('received: %s', request);
        var message = JSON.parse(request);
        var type = message.type;
        var data = message.data;
        switch(type) {
            case "send_message":
                sendMessage(data);
                break;
            case "get_messages":
                getMessage(ws);
                break;
            default:
                console.log("Cannot find message type " + type);
                break;
        }
    });
});

function sendMessage(message){
    messages.push(message);
    wss.broadcast("get_messages", messages);
}

function getMessage(ws){
    var response = {
        type: "get_messages",
        data: messages
    };
    ws.send(JSON.stringify(response));
}


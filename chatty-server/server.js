// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log("Users online:", wss.clients.size);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({ userCount: wss.clients.size, type: "onlineUsers" })
        );
      }
    });

  ws.onmessage = function(e) {
    const json = JSON.parse(e.data);
    json.id = uuidv4();
    if (json.type === "postMessage") {
      json.type = "incomingMessage"
      stringData = JSON.stringify(json);
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(stringData);
        }
      });
    } else if (json.type === "postNotification") {
        json.type = "incomingNotification"
        stringData = JSON.stringify(json);
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(stringData);
          }
        });
      }
  }
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
   wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({ userCount: wss.clients.size, type: "onlineUsers" })
      );
    }
  });
})
});
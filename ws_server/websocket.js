const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const createServer = (port) => {
    const app = express();
    const server = http.createServer(app);
    const wsServer = new WebSocket.Server({ noServer: true });

    wsServer.on("connection", (conn) => {
        conn.on("message", (message) => {
            try {
                const received = JSON.parse(message);
                const reply = {
                    name: received.name,
                    message: received.message,
                    dateTime: received.dateTime
                };
                wsServer.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(reply));
                    }
                });
            } catch (error) {
                console.error("Failed to process message:", error);
            }
        });
    });

    server.on('upgrade', function (request, socket, head) {
        wsServer.handleUpgrade(request, socket, head, function (ws) {
            wsServer.emit('connection', ws, request);
        });
    });

    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
};

createServer(8080);
createServer(8081);

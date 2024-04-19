const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const app = express();
const SocketIo = require('socket.io');
app.use(express.static(__dirname + '/dist'));

// const httpServer = http.createServer(app);
// const wsServer = SocketIo(httpServer);
// httpServer.listen(80, () => {
// 	console.log('http server started');
// });
const httpsServer = https.createServer(
	{
		ca: fs.readFileSync('./ssl/ca_bundle.crt'),
		key: fs.readFileSync('./ssl/private.key'),
		cert: fs.readFileSync('./ssl/certificate.crt'),
	},
	app,
);
const wsServer = SocketIo(httpsServer);
httpsServer.listen(443, () => {
	console.log('https server started');
});

wsServer.on('connection', (socket) => {
	socket.on('joinRoom', (roomId) => {
		socket.join(roomId);
		socket.to(roomId).emit('userJoin');
	});

	socket.on('offer', (roomId, offer) => {
		socket.to(roomId).emit('offer', offer);
	});

	socket.on('answer', (roomId, answer) => {
		socket.to(roomId).emit('answer', answer);
	});

	socket.on('candidate', (roomId, candidate) => {
		socket.to(roomId).emit('candidate', candidate);
	});
});

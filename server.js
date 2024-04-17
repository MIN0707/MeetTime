const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();

var sslOptions = {
	//1. PEM을 사용하여 인증하는 경우(cert, ca, key파일을 사용하여 인증하는 경우)
	//확장자명이 .pem인 경우도 있습니다.
	key: fs.readFileSync('./ssl/localhost-key.pem'),
	cert: fs.readFileSync('./ssl/localhost.pem'),
};

app.use(express.static(__dirname + '/dist'));

https
	.createServer(sslOptions, app, (req, res) => {})
	.listen(443, () => {
		console.log('server started');
	});

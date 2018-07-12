const express = require('express');
const http = require('http');

const app = express();
app.use(express.static('public'));

const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);


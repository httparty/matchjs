var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var port = process.env.PORT;
var middleware = require('./config/middleware.js');

middleware(app, express);

server.listen(port, function() {
  console.log('Listening on port', port);
});
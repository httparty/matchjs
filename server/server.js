require('dotenv').load();
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 5000;
var middleware = require('./config/middleware.js');
// var mailer = require('./config/mailer.js');

middleware(app, express);
// mailer();

server.listen(port, function() {
  console.log('Listening on port', port);
});
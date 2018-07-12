var fs = require('fs');
var path = require('path');

var url = require('url');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var ROOT = './';

// Use EJS as our template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));

app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/img", express.static(__dirname + "/img"));

server.listen(80);

require('./app/routes.js')(app); // load our routes and pass in our app

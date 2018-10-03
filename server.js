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

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/img", express.static(__dirname + "/img"));

server.listen(4000);

require('./app/routes.js')(app); // load our routes and pass in our app

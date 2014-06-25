"use strict";

var express = require('express');
var path = require('path');

var routes = require('./server/routes.js');

var app = express();
var port = process.env.PORT || 1337;


app.use(express.static(path.join(__dirname, 'client'))); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


routes(app);


app.listen(port);
console.log('Server started! Listening on port ' + port + '.');
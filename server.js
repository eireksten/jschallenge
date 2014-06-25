"use strict";

var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./server/routes.js');

var app = express();
var port = process.env.PORT || 1337;

var passconfig = require('./server/config/passport.js');
var dbconfig = require('./server/config/database.js');

passconfig(passport);
mongoose.connect(dbconfig.url);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'client')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'sjokoladepudding'}));
app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

app.listen(port);
console.log('Server started! Listening on port ' + port + '.');
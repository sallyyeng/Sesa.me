const express = require('express');
const app = express();
const passport = require('passport')
const session = require('express-session')
const env = require('dotenv').load();

// Middleware
var parser = require('body-parser');

// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

// Router
var router = require('./routes.js');

// Set port
app.set('port', process.env.PORT || 3000);

// Parsing
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// Routes
app.use('/', router);

// Static Files
app.use(express.static(__dirname + '/../client/dist'));

// Init server
app.listen(app.get('port'));
console.log('Listening on', app.get('port'));
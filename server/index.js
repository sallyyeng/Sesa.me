const env = require('dotenv').load();
const express = require('express');
const app = express();
const passport = require('passport'),
  LocalStrategiy = require('passport-local').Strategy;

// Middleware
var parser = require('body-parser');

// Router
var router = require('/routes.js');

// Set port
app.set('port', process.env.PORT || 3000);

// Parsing
app.use(parser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use('/', router); 

// Authentication
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({username: username}, (err, user) => {
      // If an exception occurs, provide err to done()
      if (err) {
        return done(err);
      }
      // If credentials are not valid, provide false to done() 
      if (!user) {
        return done(null, false, {message: 'Incorrect username.'});
      }
      if (!user.validPassword(password)) {
        return done(null, false, {message: 'Incorrect password.'});
      }
      // If credentials are valid, provide user to done()
      return done(null, user);
    });
  }
));

// Static Files
app.use(express.static(__dirname + '../client'));

// Init server
app.listen(app.get('port'));
console.log('Listening on', app.get('port'));
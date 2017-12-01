// require('dotenv').config();
const express = require('express');
var cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const parser = require('body-parser');
const env = require('dotenv').load();
const router = require('./routes.js');
const setupPassport = require('../config/passport/passport.js');
const LocalStrategy = require('passport-local').Strategy;


// Set port
app.set('port', process.env.PORT || 3001);

//Socket
const server = require('http').createServer(app)
const io = require('socket.io')(server);

// Parsing
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

server.listen(3001)
console.log('Listening on', app.get('port'));

// Routes
app.use('/', router);


// Passport, Parser, Static Files,
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(`${__dirname}/../client/dist`));

app.use(flash());
app.use(function(req, res, next) {
  res.locals.errorMessage = req.flash('error');
  next();
});

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

setupPassport(app);

// Express Router
app.use('/', router);

// Set port
// app.set('port', process.env.PORT || 3000);

// Init server
// app.listen(app.get('port'));
// console.log('Listening on', app.get('port'));

//Socket
io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('send:message', (msg) => {
    console.log('Message: ', msg)
    io.emit('send:message', {
      username: msg.username,
      message: msg.message
    });
  })
});

// http.listen(3002, function(){
//   console.log('listening on *:3002');
// });


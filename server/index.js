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
const path = require('path');
const sequelize = require('./db/index.js');


const app = express();

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

// Set port
app.set('port', process.env.PORT || 3000);

//Socket
const server = require('http').createServer(app)
const io = require('socket.io')(server);

// Parsing
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

server.listen(3000)
console.log('Listening on', app.get('port'));


//Socket
var users = {};
var rooms = {};
var id = -1;

io.on('connection', function(socket) {
  console.log('a user connected');

  // var hs = socket.handshake;
  // users[hs.session.username] = socket.id;
  // clients[socket.id] = socket;
  socket.on('join:room', (userData) => {
    socket.username = userData.username;
    socket.roomname = userData.roomname
    socket.join(userData.roomname);
    users[userData.username] =  userData.username;
    rooms[userData.roomname] = userData.roomname;
    console.log('Joined the room');
    sequelize.User.findOne({
      where: {
        username: socket.username,
      }
    }).then(user => {
      sequelize.Message.findAll({
        userId: user.get('id'),
      }).then(chatHistory => {
        console.log('Successful user message creation with', chatHistory);
        socket.emit('reload:chat', chatHistory);
      }).catch((err) => {
        console.log('Error creating user message with', err);
        res.sendStatus(400);
      });
    });


    var welcomeMessage = {
      id: id++,
      username: '',
      message: `You have connected to room ${userData.roomname}`,
      // content: `You have connected to room ${userData.roomname}`,
    }
    socket.emit('update:chat', welcomeMessage);
    var connectionMessage = {
      id: id++,
      username: '',
      message: userData.username + ' has connected to the room',
      // content: `${userData.username} has connected to the room`,
    }

    

    socket.broadcast.to(socket.roomname).emit('update:chat', connectionMessage);
  })


  socket.on('send:message', (msg) => {
    console.log('Message: ', msg)
    id = id++;
    sequelize.User.findOne({
      where: {
        username: socket.username,
      }
    }).then(user => {
      sequelize.Message.create({
        userId: user.get('id'),
        message_sender: msg.username,
        message_order: id,
        message_text: msg.message,
      }).then(createdMessage => {
        console.log('Successful user message creation with', createdMessage);
      }).catch((err) => {
        console.log('Error creating user message with', err);
        res.sendStatus(400);
      });
    });
    
    io.sockets.in(socket.roomname).emit('update:chat', {
      id: id,
      username: msg.username,
      message: msg.message,
      content: `${msg.username}: ${msg.message}`
    });
  })

  socket.on('disconnect', () => {
    delete users[socket.username];
    delete rooms[socket.roomname];
  })
});

//STEP 1: Just get rooms to work between anyone
  //get messages in box to scroll within item
//STEP 2: Store messages to each user
  //messages will require some order to show up
//messages will have ids
// messages {
//   id:
//   client_id:
//   username:
//   message:
// }

// change the id to match the right number
// be able to retrieve all recorded messages


//STEP 2: Have an admin receive the list of rooms with connections to all of them - any received messages will cause a light up

//Client when signing up will establish a new room to connect to
//this info needs to be sent to the admin for them to be able to find the room
//does the server need to emit messages for everyroom built?
//or can two clients just send messages to each other?

//Will need the message object passed to contain info on which room messages should be sent to
//Will call the roomname for now the username
//
//need an object to show all people who are connected and what they're chatroom ids are?
//all of this information gets sent to the admin
<<<<<<< HEAD
//admin when opening a component will have the credentials to connect to appropriate chat




//react router's path
app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
=======
//admin when opening a component will have the credentials to connect to appropriate chat
>>>>>>> Chatbox now saves messages into db

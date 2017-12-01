// require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const parser = require('body-parser');
const env = require('dotenv').load();
const exphbs = require('express-handlebars');
const router = require('./routes.js');


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


// Static Files
app.use(express.static(`${__dirname}/../client/dist`));

// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set('views', './server/views');
app.engine('hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Import Models
const models = require('./db/index');

// // Auth Routes
// const authRoute = require('./controllers/authcontroller.js')();

// load passport strategies
require('../config/passport/passport.js')(models.User);

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


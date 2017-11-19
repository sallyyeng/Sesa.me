// const http = require('http');

// const requestHandler = (request, response) => {
//   console.log(request.url)
//   response.end(process.env.PORT)
// }

// const server = http.createServer(requestHandler);

// server.listen(port, (err) => {
//   if (err) {
//     return console.log('something bad happened', err);
//   }

//   console.log(`server is listening on ${port}`);
// })

// EXPRESS ROUTER REFACTOR //

const express = require('express');
const app = express();

// Middleware
var parser = require('body-parser');

// Router
var router = require('/routes.js');

// Set port
app.set('port', process.env.PORT || 3000);

// Parsing
app.use(parser.json());

// Routes
app.use('/', router); ????

// Static Files
app.use(express.static(__dirname + '../client'));

// Init server
app.listen(app.get('port'));
console.log('Listening on', app.get('port'));
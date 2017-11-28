const express = require('express');
const app = express();

//DEPLOYMENT DB

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

//^^^DEPLOPYMENT DB


// Middleware
var parser = require('body-parser');

// Router
var router = require('./routes.js');

// Set port
app.set('port', process.env.PORT || 3000);

// Parsing
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

// Routes
app.use('/', router);

// Static Files
app.use(express.static(__dirname + '/../client/dist'));

// Init server
app.listen(app.get('port'));
console.log('Listening on', app.get('port'));
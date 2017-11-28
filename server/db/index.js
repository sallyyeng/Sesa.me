// This file initialize a sequelize instance
// It contains code that defines models, their relationships, and creates the tables IF they don't already exist in mysql

// if (!global.hasOwnProperty('db')) {
//   var Sequelize = require('sequelize')
//     , db = null

//   if (process.env.DATABASE_URL) {
//     // the application is executed on Heroku ... use the postgres database
//     db = new Sequelize(process.env.DATABASE_URL, {
//       dialect:  'postgres',
//       protocol: 'postgres',
//       port:     match[4],
//       host:     match[3],
//       logging:  true //false
//     })
//   } else {
//     // the application is executed on the local machine ... use mysql
//     db = new Sequelize('messages', 'root', '', {dialect: 'mysql'});
//   }
// }



const Sequelize = require('sequelize');
//db is named messages
const db = new Sequelize('messages', 'root', '', {
  dialect: 'mysql'
});


// //DEPLOYMENT DB

// const { Client } = require('pg');

// const db = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });

// db.connect();

db.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  db.end();
});

//^^^DEPLOPYMENT DB


db.query('CREATE DATABASE IF NOT EXISTS messages').then(() => console.log('Database created'));


const User = db.define('user', {
  //id is already created by default as PK
  username: {type: Sequelize.STRING, unique: true},
  hash: Sequelize.STRING,
  salt: Sequelize.STRING,
  account_type: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING
})


const Submission = db.define('submission', {
  //id (PK), createdAt, and user id (FK) are created by default
  user_message: Sequelize.TEXT,
  user_contact: Sequelize.TEXT,
  user_urgency: Sequelize.INTEGER,
  admin_response: Sequelize.TEXT,
  //Sequelize Boolean will be converted to TINYINT(1)
  admin_complete: Sequelize.BOOLEAN,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING
})

//define 1:many relationship of Users:Submissions
Submission.belongsTo(User);
User.hasMany(Submission);

//create tables if they do not yet exist
User.sync();
Submission.sync();

exports.User = User;
exports.Submission = Submission;
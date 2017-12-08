const path = require('path');
const env = process.env.NODE_ENV || 'development';
const Sequelize = require('sequelize');
const config = require(path.join(__dirname, '../..', 'config', 'config.json'))[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const passportLocalSequelize = require('passport-local-sequelize');
const bcrypt = require('bcrypt');
const db = {};

console.log('DATABASE TO CONNECT ', env, config.database);

// sequelize.query('CREATE DATABASE IF NOT EXISTS messages')
//   .then(() => console.log('Database created'));
// adding this comment here for the rebuild
const User = sequelize.define('user', {
  //id is already created by default as PK
  username: {
    type: Sequelize.STRING,
    ignoreDuplicates: true,
  },
  hash: Sequelize.STRING,
  salt: Sequelize.STRING,
  account_type: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  location: Sequelize.STRING,
  lat: Sequelize.STRING,
  long: Sequelize.STRING,
});

const Submission = sequelize.define('submission', {
  //id (PK), createdAt, and user id (FK) are created by default
  user_name: Sequelize.TEXT,
  user_email: Sequelize.TEXT,
  user_location: Sequelize.TEXT,
  user_phoneNumber: Sequelize.TEXT,
});

const Message = sequelize.define('message', {
  //id (PK), createdAt, and user id (FK) are created by default
  message_order: Sequelize.INTEGER,
  message_text: Sequelize.TEXT,
  message_sender: Sequelize.TEXT
});

//define 1:many relationship of Users:Submissions
Submission.belongsTo(User);
User.hasMany(Submission);

//define 1:many relationship of Users:Messages
Message.belongsTo(User);
User.hasMany(Message);

//create tables if they do not yet exist

// AUTOFILL: admin data into user table with account_type: 'admin';
User.sync()
  .then(() => {
    // Now instantiate an object and save it:
    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync('adminpassword', salt);

    return User.create({
      username: 'admin_1',
      hash: hashedPassword,
      salt: salt,
      account_type: 'admin',
      first_name: 'admin',
      last_name: 'admin',
    });
  })

Submission.sync();
Message.sync();

db.User = User;
db.Submission = Submission;
db.Message = Message;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

//CREDENTIALS FOR THE STAGING DB
//CLEARDB_DATABASE_URL: mysql://badabdf3838c5c:7a09b42d@us-cdbr-iron-east-05.cleardb.net/heroku_0e35bdd032f8e0c?reconnect=true
var username = 'badabdf3838c5c';
var password = '7a09b42d';
var database = 'heroku_0e35bdd032f8e0c';
var host = 'us-cdbr-iron-east-05.cleardb.net';

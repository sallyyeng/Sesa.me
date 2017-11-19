// This file contains route handlers for the following routes
  // /login, /signup, /submissions
// These handlers will utilize instances of sequelize models to query the database directly 

const db = require('../db/index.js');

module.exports = {

  //signup controller
  signup: {
    post: (req, res) => {
      //create user
      db.User.findOrCreate({
        where: {username: req.body.username}
      })
      .spread((user, created) => {
        console.log('Signup POST with', user.get({plain: true}));
        //need to integrate passport strat
        // res.sendStatus(created ? 201 : 200);
      })
    }
  },

  //login controller
  login: {
    get: (req, res) => {
      // display user info from submissions table
    },
    post: (req, res) => {
      // authenticate user
    }
  },

  //submissions controller
  submissions: {
    get: (req, res) => {
      // if admin
        // display messages from users
      // if user
        // display responses from admin to messages sent
    },
    post: (req, res) => {
      // user only - add message to submission table
    },
    patch: (req, res) => {
      // admin only - add response to existing submission row in sub. table
    }
  }

}
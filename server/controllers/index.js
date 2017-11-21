// This file contains route handlers for the following routes
  // /login, /signup, /submissions
// These handlers will utilize instances of sequelize models to query the database directly 

const db = require('../db/index.js');

module.exports = {
  //signup controller
  signup: {
    //creates a new user or finds an already existing user
    post: (req, res) => {
      db.User.findOrCreate({
        //***TODO*** add PW to created user, handle incorrect PW. takes admin and pw
          //***TODO***: check is username exists, if yes find. if no, create with given PW
        where: {username: req.body.username}
      })
      .spread((user, created) => {
        console.log('Signup POST with', user.get({plain: true}));
        res.sendStatus(created ? 201 : 200);
      })
    }
  },

  //login controller
  login: {
    //***TODO***: authenticate user (check username and matching pw, hashing?)
    post: (req, res) => {
      console.log('login post');
    }
  },

  //submissions controller
  submissions: {
    //***TODO***: display all or some user info on GET from componentDidMount
      //send username, admin status
        //if req.body.admin, send everything else send whatever matches username
    get: (req, res) => {
      // if admin
        // display messages from users
      // if user
        // display responses from admin to messages sent
      console.log('submissions get');
    },
    post: (req, res) => {
      // user only - add message to submission table
        //req.body.postUsername
      console.log('submissions post');
    },
    patch: (req, res) => {
      // admin only - add response to existing submission row in sub. table
        //req.body.postUsername
      console.log('submissions patch');
    }
  }

}
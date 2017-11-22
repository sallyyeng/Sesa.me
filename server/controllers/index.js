// This file contains route handlers for the following routes
  // /login, /signup, /submissions
// These handlers will utilize instances of sequelize models to query the database directly 

const db = require('../db/index.js');

module.exports = {
  signup: {
    //creates a new user or finds an already existing user
    //***TODO***: handle incorrect pw but pre-existing user
    post: (req, res) => {
      db.User.findOrCreate({
        where: {username: req.body.username, hash: req.body.hash}
      })
      .spread((user, created) => {
        console.log('Signup POST with', user.get({plain: true}));
        res.sendStatus(created ? 201 : 200);
      })
    }
  },

  login: {
    //authenticate user, verifying username and hashed pw match
    post: (req, res) => {
      db.User.findOne({
        where: {
          username: req.body.username,
          hash: req.body.hash
        }
      })
      .then((user) => {
        console.log('Successful authentication')
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('Incorrect login details with error:', err);
        res.sendStatus(400);
      })
    }
  },
  submissions: {
    //send a specific user's messages or all messages for an admin
    get: (req, res) => {
      if (req.body.account_type === 'admin') {
        db.Submission.findAll()
        .then((allMessages) => {
          console.log('Fetched all msgs for admin with', allMessages);
          res.status(200).json(allMessages);
        })
        .catch((err) => {
          console.log('Error fetching msgs for admin with', err);
          res.sendStatus(404);
        })
      } else {
        db.Submission.findAll({
          where: {
            //Note: userId is the FK in the submission model that points to a particular user
            userId: req.body.username
          }
        })
        .then((userMessages) => {
          console.log('Fetched all msgs for user with', userMessages);
          res.status(200).json(userMessages);
        })
        .catch((err) => {
          console.log('Error fetching msgs for user with', err);
          res.sendStatus(404);
        })
      }
    },
    //write a message to the db associated with a particular user
    post: (req, res) => {
      if (req.body.account_type !== 'admin') {
        db.User.findOne({
          where: {
            username: req.body.username
          }
        })
        .then((user) => {
          db.Submission.create({
            userId: user.get('id'),
            user_message: req.body.user_message,
            user_contact: req.body.user_contact,
            user_urgency: req.body.user_urgency
          })
          .then((createdMessage) => {
            console.log('Successful user message creation with', createdMessage);
            res.sendStatus(201);
          })
        })
        .catch((err) => {
          console.log('Error creating user message with', err);
          res.sendStatus(400);
        })
      } else {
        console.log('Admins cannot create messages, only amend existing ones');
        res.sendStatus(400);
      }
    },
    //allows an admin to edit most recent submission associated with a user
      //***TODO***Select and edit by submission id
    patch: (req, res) => {
      if (req.body.account_type === 'admin') {
        //find most recent message from a specific user
        db.Submission.findAll({
          limit: 1,
          where: {
            username: req.body.username
          },
          order: [['createdAt', 'DESC']]
        })
        //update that message with admin's response
        .then((latestMessage) => {
          latestMessage.update({
            admin_response: req.body.admin_response,
            admin_complete: req.body.admin_complete
          })
          .then((updatedMessage) => {
            console.log('Successful message update with', updatedMessage);
            res.sendStatus(201);
          })
          .catch((err) => {
            console.log('Error amending user message with', err);
            res.sendStatus(400);
          })
        })
      } else {
        console.log('Only admins can amend messages');
        res.sendStatus(400);
      }
    }
  }
}
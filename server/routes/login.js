const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const models = require('../db/index.js');
const User = models.User;

const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'hash'
},
function(username, hash, done) {
  console.log(`username inside strategy: ${username}`);
  console.log(`hash inside strategy: ${hash}`);
  User.findOne({
    where: {
      username: username,
    }
  })
    .then((user) => {
      console.log(`this is user: ${user}`);
      if (user) {
        console.log(`hash inside user found: ${user.get('hash')}`);
        bcrypt.compare(hash, user.get('hash'), (err, validPassword) => {
          if (err) { throw new Error('error'); }
          if (validPassword) {
            return done(null, user, {message: 'user found, password matched'});
          } else {
            return done(null, false, {message: 'invalid password'});
          }
        });
      } else {
        console.log('cannot find user dummy!');
      }
    })
    .catch(err => done(err, false, {message: 'user not found'}));
}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// //when login is successful
router.post('/',
  passport.authenticate('local', {failureFlash: true, successFlash: true}),
  function(req, res) {
    console.log('authenticated user:', req.user);
    res.json(req.user);
  });

module.exports = router;


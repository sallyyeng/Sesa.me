const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const models = require('../db/index.js');
const User = models.User;

const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.use('local-signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'hash',
  passReqToCallback: true
},
function(req, username, hash, done) {
  User.findOne({
    where: {
      username: username,
    }
  })
    .then((user) => {
      if (user) {
        bcrypt.compare(hash, user.get('hash'), (err, validPassword) => {
          if (err) { throw new Error('error'); }
          if (validPassword) {
            return done(null, user, {message: 'user found, password matched'});
          } else {
            return done(null, false, {message: 'invalid password'});
          }
        });
      } else {
        return done(null, false, {message: 'Please enter a valid username'});
      }
    })
    .catch(err => done(err, false, {message: 'user not found'}));
}
));

passport.serializeUser(function(user, done) {
  console.log('inside serializeUser');
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


// //when login is successful
router.post('/',
  passport.authenticate('local-signin', {failureRedirect: '/Login'}),
  (req, res) => {
    console.log('authenticated user:', req.user.username);
    res.json(req.user);
  });

module.exports = router;


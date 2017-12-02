const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../../server/db/index.js');
const User = models.User;

passport.use(new LocalStrategy({passReqToCallback: true},
  (req, done) => {
    const { username, password } = req;
    console.log(`username becomes ${username}`)
    console.log(`password becomes ${password}`)

    User.findOne({
      where: {
        'username': req.body.username
      }
    }).then(function (user) {
      if (user == null) {
        return done(null, false, { message: 'Incorrect credentials.' });
      }

      var hashedPassword = bcrypt.hashSync(req.body.hash, user.salt);

      if (user.password === hashedPassword) {
        return done(null, user);
      }

      return done(null, false, { message: 'Incorrect credentials.' });
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findOne({
    where: {
      'id': id
    }
  }).then(function (user) {
    if (user == null) {
      done(new Error('Wrong user id.'));
    }

    done(null, user);
  });
});

//when login is successful
router.post('/',
  passport.authenticate('local', {failureFlash: true, successFlash: true}),
  function(req, res) {
    console.log('authenticated user:', req.user);
    res.json(req.user);
  });


module.exports = router;


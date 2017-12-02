const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const models = require('../../server/db/index.js');
const User = models.User;

const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'hash'
},
function(username, password, done) {
  console.log('INSIDE STRATEGY');
  User.findOne({ username: username }, function (err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
}
));

// passport.use(new LocalStrategy({passReqToCallback: true},
//   (req, done) => {
//     const { username, password } = req;
//     console.log(`username becomes ${username}`)
//     console.log(`password becomes ${password}`)

//     User.findOne({
//       where: {
//         'username': req.body.username
//       }
//     }).then(function (user) {
//       if (user == null) {
//         return done(null, false, { message: 'Incorrect credentials.' });
//       }

//       var hashedPassword = bcrypt.hashSync(req.body.hash, user.salt);

//       if (user.password === hashedPassword) {
//         return done(null, user);
//       }

//       return done(null, false, { message: 'Incorrect credentials.' });
//     });
//   }
// ));

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

// router.post('/login',
//   passport.authenticate('local', { successRedirect: '/game',
//     failureRedirect: '/login',
//     failureFlash: true })
// );

module.exports = router;


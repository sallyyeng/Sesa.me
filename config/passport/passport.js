<<<<<<< 4e4bf8bdf365ebb8add95fa852034dba78b2460f
=======
// const passport = require('passport');
// const bcrypt = require('bcrypt');
// const LocalStrategy = require('passport-local').Strategy;
// const models = require('../../server/db/index.js');
// const User = models.User;

// module.exports = function (app) {
//   app.use(passport.initialize());
//   app.use(passport.session());

//   passport.use( new LocalStrategy({
//     usernameField: '',
//     passwordField: '',
//     passReqToCallback: true
//   },

//   (req, password, done) => {
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
//   ));

//   passport.serializeUser(function (user, done) {
//     done(null, user.id);
//   });

//   passport.deserializeUser(function (id, done) {
//     User.findOne({
//       where: {
//         'id': id
//       }
//     }).then(function (user) {
//       if (user == null) {
//         done(new Error('Wrong user id.'));
//       }

//       done(null, user);
//     });
//   });
// };
>>>>>>> Reconfigure passport middleware to utilize express-mysql-session

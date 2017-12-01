const passport = require('passport');
<<<<<<< 95b1f039481e6170fb4734ea7732a75d8ef8ec8b
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const models = require('../../server/db/index.js');
const User = models.User;

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  console.log('INSIDE PASSPORTJS FILE');

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({
        where: {
          'username': username
        }
      }).then(function (user) {
        if (user == null) {
          return done(null, false, { message: 'Incorrect credentials.' });
        }

        var hashedPassword = bcrypt.hashSync(password, user.salt);

        if (user.password === hashedPassword) {
          return done(null, user);
=======

module.exports = function (user) {
  const User = user;
  const LocalStrategy = require('passport-local').Strategy;

  passport.use('local-signup', new LocalStrategy(

    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback

    }, (req, password, done) => {
      // hash password
      var generateHash = (password => {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      });
      var userPassword = generateHash(password);
      var data =
        {
          password: userPassword,
          firstname: req.body.firstname,
          lastname: req.body.lastname
        };
      User.create(data).then(function (newUser, created) {
        if (!newUser) {
          return done(null, false);
        }
        if (newUser) {
          return done(null, newUser);
>>>>>>> Handle /signup with passport
        }

        return done(null, false, { message: 'Incorrect credentials.' });
      });
<<<<<<< 89a76ff30472b176a359e1d51843ae9333579f6a
<<<<<<< 95b1f039481e6170fb4734ea7732a75d8ef8ec8b
    }
  ));

=======
      //     }
      //   });
      // }
=======
>>>>>>> save username /signup handler with passport
    }));

  //serialize
>>>>>>> Handle /signup with passport
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

<<<<<<< 95b1f039481e6170fb4734ea7732a75d8ef8ec8b
  passport.deserializeUser(function(id, done) {
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
=======
  // deserialize user
  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

>>>>>>> Handle /signup with passport
};

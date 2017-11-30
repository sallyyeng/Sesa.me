var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport, user) {
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

      // store user input data
      // User.findOne({
      //   where: {
      //     email: email
      //   }
      // }).then(function (user) {
      //   if (user) {
      //     return done(null, false, {
      //       message: 'That email is already taken'
      //     });
      //   } else {
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

        }
      });
      //     }
      //   });
      // }
    }));
};

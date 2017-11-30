// var exports = module.exports = {};

// exports.signup = function (req, res) {

//   res.render('signup');

// };

// exports.signin = function (req, res) {

//   res.render('signin');

// }

const passport = require('passport');

module.exports = {

  signup: {
    post: (req, res) => {
      console.log('INSIDE NEW SIGNUP POST HANDLER');
      passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
      });
    }
  }

};

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
    authMiddle: function(req, res) {
      // Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
      //   if (err) {
      //     return res.render('register', { account : account });
      //   }

      passport.authenticate('local')(req, res, function () {
        res.status(201).send();
      });
    },

  }

};
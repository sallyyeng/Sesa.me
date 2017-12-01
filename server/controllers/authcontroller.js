
const passport = require('passport');
const bcrypt = require('bcrypt');
const models = require('../db/index.js');
const User = models.User;

module.exports.signup = function(req, res) {

  if (req.body.hash !== req.body.hash2) {
    res.status(404).send('Please enter the same password twice.')
  }

  var salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(req.body.hash, salt);

<<<<<<< 95b1f039481e6170fb4734ea7732a75d8ef8ec8b
  let newUser = {
    username: req.body.username,
    hash: hashedPassword,
    salt: salt,
    account_type: req.body.account_type,
    first_name: req.body.first_name,
    last_name: req.body.last_name
=======
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

>>>>>>> Handle /signup with passport
  }

  User.create(newUser).then(function() {
    res.status(201).send();
  }).catch(function(error) {
    req.flash('error', "Please, choose a different username.")
    res.redirect('/signup')
  })
}

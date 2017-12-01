
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

  let newUser = {
    username: req.body.username,
    hash: hashedPassword,
    salt: salt,
    account_type: req.body.account_type,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }

  User.create(newUser).then(function() {
    res.status(201).send();
  }).catch(function(error) {
    req.flash('error', "Please, choose a different username.")
    res.redirect('/signup')
  })
}

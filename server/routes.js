// This file sets up express router
const controller = require('./controllers/index.js');
const authController = require('./controllers/authcontroller');
const router = require('express').Router();
var passport = require('passport');

<<<<<<< 89a76ff30472b176a359e1d51843ae9333579f6a
// router.get('/login', controller.login.get);
router.post('/login', controller.login.post);

<<<<<<< 95b1f039481e6170fb4734ea7732a75d8ef8ec8b
=======
// router.get('/signup', controller.signup.get);
// router.post('/signup', controller.signup.post);
router.post('/signup', authController.signup.authMiddle);
>>>>>>> Handle /signup with passport
=======
const sequelize = require('./db/index.js');
const bcrypt = require('bcrypt');
// const Sequelize = require('sequelize');
>>>>>>> save username /signup handler with passport

// router.get('/signup', controller.signup.get);
router.post('/signup', controller.signup.post);
router.get('/submissions', controller.submissions.get);
router.post('/submissions', controller.submissions.post);
router.patch('/submissions', controller.submissions.patch);

<<<<<<< 89a76ff30472b176a359e1d51843ae9333579f6a
router.get('/location', controller.location.get);

// router.get('/signup', controller.signup.get);
router.post('/signup', controller.signup.post);
// router.post('/signup', authController.signup);

// router.get('/login', controller.login.get);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/game',
  failureRedirect: '/',
  failureFlash: true
}));
=======
// router.get('/signup', controller.signup.get);
// router.post('/signup', controller.signup.post);
// router.post('/signup', authController.signup.authMiddle);

const passport = require('passport');
router.post('/signup', function(req, res) {
  // Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
  //   if (err) {
  //     return res.render('register', { account : account });
  //   }
  bcrypt.hash(req.body.hash, 10, (err, hash) => {
    if (err) {
      console.log('Error hashing password ', err);
      res.sendStatus(400);
    }
    sequelize.User.findOrCreate({
      where: {
        username: req.body.username,
        hash: hash,
        salt: req.body.salt,
        account_type: req.body.account_type,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      }
    });
  });

  passport.authenticate('local')(req, res, function () {
    res.status(201).send();
  });
});

// router.get('/login', controller.login.get);
router.post('/login', controller.login.post);
>>>>>>> save username /signup handler with passport

module.exports = router;

// This file sets up express router
const controller = require('./controllers/index.js');
const authController = require('./controllers/authcontroller.js');
const router = require('express').Router();
const bcrypt = require('bcrypt');

const dbHelper = require('./db/helpers');
const sequelize = require('./db/index');
// const Sequelize = require('sequelize');

router.get('/submissions', controller.submissions.get);
router.post('/submissions', controller.submissions.post);
router.patch('/submissions', controller.submissions.patch);

// router.get('/signup', controller.signup.get);
// router.post('/signup', controller.signup.post);
// router.post('/signup', authController.signup.authMiddle);

const passport = require('passport');

router.post('/signup', function(req, res) {
  dbHelper.createUser(req);

  passport.authenticate('local')(req, res, function () {
    res.status(201).send();
  });
});

// router.get('/login', controller.login.get);
router.post('/login', controller.login.post);

module.exports = router;

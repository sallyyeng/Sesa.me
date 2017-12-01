// This file sets up express router
const controller = require('./controllers/index.js');
const authController = require('./controllers/authcontroller');
const router = require('express').Router();
var passport = require('passport');

// router.get('/login', controller.login.get);
router.post('/login', controller.login.post);

<<<<<<< 95b1f039481e6170fb4734ea7732a75d8ef8ec8b
=======
// router.get('/signup', controller.signup.get);
// router.post('/signup', controller.signup.post);
router.post('/signup', authController.signup.authMiddle);
>>>>>>> Handle /signup with passport

// router.get('/signup', controller.signup.get);
router.post('/signup', controller.signup.post);
router.get('/submissions', controller.submissions.get);
router.post('/submissions', controller.submissions.post);
router.patch('/submissions', controller.submissions.patch);

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

module.exports = router;

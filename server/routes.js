<<<<<<< 4e4bf8bdf365ebb8add95fa852034dba78b2460f
=======
// // This file sets up express router
// const controller = require('./controllers/index.js');
// const authController = require('./controllers/authcontroller');
// const router = require('express').Router();
// var passport = require('passport');

// router.get('/submissions', controller.submissions.get);
// router.post('/submissions', controller.submissions.post);
// router.patch('/submissions', controller.submissions.patch);

// // router.get('/signup', controller.signup.get);
// // router.post('/signup', controller.signup.post);
// router.post('/signup', authController.signup);

// const loginMiddleware = passport.authenticate('local', {
//   successRedirect: '/game',
//   failureRedirect: '/',
//   failureFlash: true
// });

// // router.get('/login', controller.login.get);
// // router.post('/login', controller.login.post);
// router.post('/login', loginMiddleware);

// // module.exports = router;
>>>>>>> Reconfigure passport middleware to utilize express-mysql-session

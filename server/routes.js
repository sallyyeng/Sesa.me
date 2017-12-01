// This file sets up express router
const controller = require('./controllers/index.js');
const authController = require('./controllers/authcontroller.js');
const router = require('express').Router();

// router.get('/login', controller.login.get);
router.post('/login', controller.login.post);

// router.get('/signup', controller.signup.get);
<<<<<<< df64940681700291efe6736b97236e6323b3947e
router.post('/signup', controller.signup.post);
// router.post('/signup', authController.signup.post);
=======
// router.post('/signup', controller.signup.post);
router.post('/signup', authController.signup.authMiddle);
>>>>>>> Handle /signup with passport

router.get('/submissions', controller.submissions.get);
router.post('/submissions', controller.submissions.post);
router.patch('/submissions', controller.submissions.patch);

module.exports = router;

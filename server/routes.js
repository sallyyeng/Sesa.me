//This file sets up express router
var controller = require('./controllers/index.js');
var router = require('express').Router();

router.get('/login', controller.login.get);
router.post('/login', controller.login.post);

router.get('/signup', controller.signup.get);
router.post('/signup', controller.signup.post);

router.get('/submissions', controller.submissions.get);
router.post('/submissions', controller.submissions.post);

module.exports = router;
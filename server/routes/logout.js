const express = require('express');
const router = express.Router();

// router.get('/', (req, res) => {
//   console.log('is authenticated?: ', req.isAuthenticated());
//   req.session.destroy(err => {
//     if (err) { res.status(304).json({status: 'Unsuccessful logout'}); }
//     else {
//       req.logout();
//       // res.status(200).clearCookie('connect.sid').json({status: 'Successful logout'});
//       res.redirect('/');
//     }
//   });
// });

router.get('/', (req, res) => {
  console.log('************************* IN HERE !!! IN THE LOGOUT HANDLER ***********************');
  req.logout();
  res.status(200).clearCookie('connect.sid').json({status: 'Successful logout'});
  // res.render(`${__dirname}/../../client/dist`);
  // res.redirect('/');
  // res.send();
});

module.exports = router;

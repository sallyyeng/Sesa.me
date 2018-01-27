const models = require('../db/index.js');
const router = require('express').Router();


router.get('/', (req, res) => {
  console.log('inside get UserData USER DATA');
  models.User.findAll({
    where: {
      account_type: { $notIn: ['admin', 'ADMIN'] }
    }
  }).then((users)=> res.status(200).send(users))
    .catch((err)=> res.status(400).send(err));
});

router.post('/', (req, res) => {
  console.log('inside get UserData single USER DATA SINGLE', req.body);
  models.User.findOne({
    where: {
      username: req.body.username
    }
  }).then((users)=> {
    console.log('PULLED FROM SINGLE', users)
    res.status(200).send(users.dataValues)
  })
    .catch((err)=> res.status(400).send(err));
});


module.exports = router;

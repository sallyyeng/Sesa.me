
const models = require('../db/index.js');
const router = require('express').Router();

router.get('/', (req, res) => {
  console.log('GET with query', req.query);
  if (req.query.account_type === 'admin') {
    models.Submission.findAll({
      where: {
        admin_complete: null
      }
    })
      .then((allMessages) => {
        console.log('Fetched all msgs for admin with', allMessages);
        res.status(200).json(allMessages);
      })
      .catch((err) => {
        console.log('Error fetching msgs for admin with', err);
        res.sendStatus(404);
      });
  } else {
    models.User.findOne({
      where: {
        username: req.query.username,
      },
    })
      .then((user) => {
        models.Submission.findAll({
          where: {
            //Note: userId is the FK in the submission model that points to a particular user
            userId: user.get('id'),
            // admin_response: {
            //   [Op.not]: null
            // }
          }
        })
          .then((userMessages) => {
            console.log('Fetched all msgs for user with', userMessages);
            res.status(200).json(userMessages);
          })
          .catch((err) => {
            console.log('Error fetching msgs for user with', err);
            res.sendStatus(404);
          });
      });
  }
});

router.post('/', (req, res) => {
  console.log('this is the request body: ', req.body)
  if (req.body.account_type !== 'admin') {
    //find user by username
    models.User.findOne({
      where: {
        username: req.body.username,
      }
    })
      .then((user) => {
        //create a submission record tied to that particular user
        console.log('user found in database: ', user)
        models.Submission.create({
          userId: user.get('id'),
          user_message: req.body.user_message,
          user_contact: req.body.user_contact,
          user_urgency: req.body.user_urgency,
          first_name: user.get('first_name'),
          last_name: user.get('last_name')
        })
          .then((createdMessage) => {
            console.log('Successful user message creation with', createdMessage);
            res.sendStatus(201);
          })
          .catch((err) => {
            console.log('Error creating user message with', err);
            res.sendStatus(400);
          });
      })
      .catch(err => {
        console.log(`you unsuccessfully found the user in db: ${err}`);
      })
  } else {
    // disallow non-users from sending messages
    console.log('Admins cannot create messages, only amend existing ones');
    res.sendStatus(400);
  }
});

router.patch('/', (req, res) => {
  console.log('ADMIN PATCH WITH ', req.body);
  // if (req.body.account_type === 'admin') {
  //find message by message id
  models.Submission.findOne({
    where: {
      id: req.body.id,
    }
  })
    //update that message with admin's response
    .then((message) => {
      message.update({
        admin_response: req.body.admin_response || 'Case marked as complete',
        admin_complete: req.body.admin_complete
      })
        .then((updatedMessage) => {
          console.log('Successful message update with', updatedMessage);
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log('Error amending user message with', err);
          res.sendStatus(400);
        });
    });
  // } else {
  //   console.log('Only admins can amend messages');
  //   res.sendStatus(400);
  // }
});

module.exports = router;

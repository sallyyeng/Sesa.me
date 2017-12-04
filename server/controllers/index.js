// // This file contains route handlers for the following routes
// // /login, /signup, /submissions
// // These handlers will utilize instances of sequelize models to query the database directly

// const sequelize = require('../db/index.js');
// const bcrypt = require('bcrypt');
// const Sequelize = require('sequelize');
// const axios = require('axios');

// const Op = Sequelize.Op;


// module.exports = {
//   location: {
//     get: (req, res) => {
//       const url = req.url.split('?');
//       const target = url[url.length-1].split('&').join('').split('long=');
//       let latd = target[0].split('lat=');
//       latd.shift();
//       target.splice(0,1,latd[0]);
//       const lat = Number(target[0]);
//       const long = Number(target[1]);
//       //console.log(lat, long, "my lat and long");

//       axios.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query=domestic+violence+services+OR+human+trafficking+help+near+me&location="+ lat + "," + long + "&radius=1000&key=AIzaSyCSvLAVosAQuQOJHtLXnwXVqTNOxMPjSH4")
//         .then(function (response) {
//           //console.log(response.data.results);
//           res.status(200).send(response.data.results);
//         })
//         .catch(function (error) {
//           console.log(error);
//           res.status(404).end();
//         });
//     }
//   },

//   submissions: {
//     // send a specific user's messages or all messages for an admin
//     get: (req, res) => {
//       console.log('GET with query', req.query);
//       if (req.query.account_type === 'admin') {
//         sequelize.Submission.findAll({
//           where: {
//             admin_complete: null
//           }
//         })
//           .then((allMessages) => {
//             console.log('Fetched all msgs for admin with', allMessages);
//             res.status(200).json(allMessages);
//           })
//           .catch((err) => {
//             console.log('Error fetching msgs for admin with', err);
//             res.sendStatus(404);
//           });
//       } else {
//         sequelize.User.findOne({
//           where: {
//             username: req.query.username,
//           },
//         })
//           .then((user) => {
//             sequelize.Submission.findAll({
//               where: {
//                 //Note: userId is the FK in the submission model that points to a particular user
//                 userId: user.get('id'),
//                 // admin_response: {
//                 //   [Op.not]: null
//                 // }
//               }
//             })
//               .then((userMessages) => {
//                 console.log('Fetched all msgs for user with', userMessages);
//                 res.status(200).json(userMessages);
//               })
//               .catch((err) => {
//                 console.log('Error fetching msgs for user with', err);
//                 res.sendStatus(404);
//               });
//           });
//       }
//     },
//     // write a message to the db associated with a particular user
    // post: (req, res) => {
    //   if (req.body.account_type !== 'admin') {
    //     //find user by username
    //     console.log('REQBODY!!!!', req.body)
    //     sequelize.User.findOne({
    //       where: {
    //         username: req.body.username,
    //       }
    //     })
    //       .then((user) => {
    //         //create a submission record tied to that particular user
    //         sequelize.Submission.create({
    //           userId: user.get('id'),
    //           user_name: req.body.name,
    //           user_email: req.body.email,
    //           user_location: JSON.stringify(req.body.location),
    //           user_phoneNumber: req.body.phoneNumber,
    //         })
    //           .then((createdMessage) => {
    //             console.log('Successful user message creation with', createdMessage);
    //             res.sendStatus(201);
    //           })
    //           .catch((err) => {
    //             console.log('Error creating user message with', err);
    //             res.sendStatus(400);
    //           });
    //       });
    //   } else {
    //     // disallow non-users from sending messages
    //     console.log('Admins cannot create messages, only amend existing ones');
    //     res.sendStatus(400);
    //   }
    // },
//     // allows an admin to edit most recent submission associated with a user
//     patch: (req, res) => {
//       console.log('ADMIN PATCH WITH ', req.body);
//       // if (req.body.account_type === 'admin') {
//       //find message by message id
//       sequelize.Submission.findOne({
//         where: {
//           id: req.body.id,
//         }
//       })
//         //update that message with admin's response
//         .then((message) => {
//           message.update({
//             admin_response: req.body.admin_response || 'Case marked as complete',
//             admin_complete: req.body.admin_complete
//           })
//             .then((updatedMessage) => {
//               console.log('Successful message update with', updatedMessage);
//               res.sendStatus(201);
//             })
//             .catch((err) => {
//               console.log('Error amending user message with', err);
//               res.sendStatus(400);
//             });
//         });
//       // } else {
//       //   console.log('Only admins can amend messages');
//       //   res.sendStatus(400);
//       // }
//     }
//   }
// };

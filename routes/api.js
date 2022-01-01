const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/user', (req, res, next) => {
  User.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/user', (req, res, next) => {
  if (req.body.name && req.body.email) {
    User.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: 'Input fields are empty',
    });
  }
});

router.delete('/user/:id', (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

router.get('/randomNum', (req, res, next) => {
  // placeholder for random API
})


module.exports = router;
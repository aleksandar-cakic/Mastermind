const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Game = require('../models/game.js');
const axios = require('axios');

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

router.delete('/user/:email', (req, res, next) => {
  User.findOneAndDelete({ email: req.params.email })
    .then((data) => res.json(data))
    .catch(next);
});

router.get('/game', (req, res, next) => {
  Game.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.delete('/game', (req, res, next) => {
  Game.deleteMany({})
    .then((data) => res.json(data))
    .catch(next);
});

router.get('/randomNum', (req, res, next) => {
  axios.get('http://www.random.org/integers/?num=4&min=0&max=7&rnd=new&base=10&col=1&format=plain')
    .then(function (response) {
      if (response.data) {
        Game.create({ solution: response.data })
          .then((data) => res.json(data))
          .catch(next);
      } else {
        res.json({
          error: 'Missing random numbers'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
})

router.get('/randomUniqueNum', (req, res, next) => {
  axios.get('http://www.random.org/sequences/?min=0&max=7&rnd=new&col=1&num=4&format=plain')
    .then(function (response) {
      if (response.data) {
        Game.create({ solution: response.data.slice(0, 7) })
          .then((data) => res.json(data))
          .catch(next);
      } else {
        res.json({
          error: 'Missing random numbers'
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
})

module.exports = router;
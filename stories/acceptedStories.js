const express = require('express');
const router = express.Router();
const helpers = require('./acceptedStoryHelpers');

router.get('/', (req, res) => {
  helpers.find()
    .then( stories => {
      res.status(200).json(stories)
    })
    .catch( err => {
      res.status(500).json({message: 'There is a problem with the server!'})
    })
})

module.exports = router
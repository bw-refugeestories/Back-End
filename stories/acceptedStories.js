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

router.get('/:id', (req, res) => {
  const {id} = req.params
  helpers.findByID(id)
    .then(story => res.status(200).json(story))
    .catch(err => res.status(500).json(err))
})

module.exports = router
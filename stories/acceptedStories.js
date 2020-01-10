const express = require('express');
const router = express.Router();
const helpers = require('./acceptedStoryHelpers');
const protected = require('../middleware/restricted-middleware');

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

router.delete('/delete/:id', protected, (req, res) => {
  const {id} = req.params;

  helpers.deleteByID(id)
    .then( result => {
      res.status(200).json({message: "deleted!"})
    })
    .catch( err => {
      res.status(500).json({message: 'There is a problem with the server'})
    })
})

module.exports = router
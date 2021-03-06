const express = require('express');
const router = express.Router();
const helpers = require('./acceptedStoryHelpers');
const protect = require('../middleware/restricted-middleware');

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

router.delete('/delete/:id', protect, (req, res) => {
  const {id} = req.params;

  helpers.deleteByID(id)
    .then( result => {
      res.status(200).json({message: "deleted!", id: result})
    })
    .catch( err => {
      res.status(500).json({message: 'There is a problem with the server'})
    })
})

router.put('/modify/:id', protect, (req, res) => {
  const {id} = req.params;
  const contentUpdate = req.body.storyContent;
  const imageUpdate = req.body.storyImg;
  const nameUpdate = req.body.storyName;

  helpers.modify(id, contentUpdate, nameUpdate, imageUpdate )
    .then(result => {
      res.status(200).json(result)
    })
    .catch( err => {
      res.status(500).json({message: 'There is something wrong with the server'})
    })
})

module.exports = router
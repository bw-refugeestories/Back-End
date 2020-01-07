const cloudinary = require('cloudinary').v2;
const express = require('express');
const router = express.Router();
const helpers = require('./pendingStoryHelpers')
const multer = require('multer')
const upload = multer({dest: "uploads/"});


router.post('/add', upload.single('image'), (req, res) => {

  async function addStory() {
    const storyName = req.body.storyName;
    const storyContent = req.body.storyContent
    var imgURL = 'hi'
    await cloudinary.uploader.upload(req.file.path, function(error, result) {
      console.log(error, result);
      imgURL = result.url
    })
    console.log(imgURL)
    const storyInfo = {storyName: storyName, storyImg: imgURL, storyContent: storyContent}
    
    helpers.add(storyInfo)
    .then( story => {
      res.status(200).json(story)
    })
    .catch( err => {
      res.status(500).json({message: 'There was an error with the server'})
    })
  }

  addStory();
})

router.post('/approve/:id', (req, res) => {
  const {id} = req.params;

  helpers.approve(id)
    .then(result => {
      res.status(202).json({message: 'Successfully approved!'})
    })
    .catch(err => {
      res.status(500).json({message: 'There was an error with the server'})
    })
})

router.get('/:id', (req, res) => {
  const {id} = req.params
  helpers.findByID(id)
   .then( results => {
     res.status(200).json(results)
   })
})

router.get('/', (req, res) => {
  helpers.find()
    .then(stories => {
      res.status(200).json(stories)
    })
    .catch(err => {
      res.status(500).json({message: 'There was an error with the server'})
    })
})

module.exports = router
const cloudinary = require('cloudinary').v2;
const express = require('express');
const router = express.Router();
const helpers = require('./pendingStoryHelpers')
// const multer = require('multer')
// const upload = multer({dest: "uploads/"});
const protect = require('../middleware/restricted-middleware');


router.post('/add', (req, res) => {
  console.log(req.body)

  async function addStory() {
    const storyName = req.body.storyName;
    const storyContent = req.body.storyContent;
    var imgURL = 'https://res.cloudinary.com/dce9vfmth/image/upload/v1578337504/migration-3129299_1920_ul2pcc.jpg';
    
    
    // if (req.file) {
    //   await cloudinary.uploader.upload(req.file.path, function(error, result) {
    //   console.log(error, result);
    //   imgURL = result.url
    //   })
    // }; Cool thing I did with uploads, works with php. Save for later

    if (req.body.image) {
      imgURL = req.body.image
    }

    const storyInfo = {storyName: storyName, storyImg: imgURL, storyContent: storyContent}
    
    helpers.add(storyInfo)
    .then( story => {
      res.status(200).json({message: "Story added!"})
    })
    .catch( err => {
      res.status(500).json({message: 'There was an error with the server'})
    })
  }

  addStory();
})

router.post('/approve/:id', protect, (req, res) => {
  const {id} = req.params;

  helpers.approve(id)
    .then(result => {
      const newID = result
      helpers.deleteByID(id)
      .then(res.status(202).json({message: 'Successfully approved!', newID: newID}))
      .catch(err => {res.status(500).json(err)})
    })
    .catch(err => {
      res.status(500).json({message: 'There was an error with the server'})
    })
})

router.delete('/delete/:id', protect, (req, res) => {
  const {id} = req.params;

  helpers.deleteByID(id)
    .then( result => {
      res.status(200).json({message: "deleted!"})
    })
    .catch( err => {
      res.status(500).json({message: 'There is a problem with the server'})
    })
})

router.get('/:id', protect, (req, res) => {
  const {id} = req.params
  helpers.findByID(id)
   .then( results => {
     res.status(200).json(results)
   })
})

router.get('/', protect, (req, res) => {
  helpers.find()
    .then(stories => {
      res.status(200).json(stories)
    })
    .catch(err => {
      res.status(500).json({message: 'There was an error with the server'})
    })
})

module.exports = router
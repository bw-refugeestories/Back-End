const express = require('express');
const router = express.Router();
const helpers = require('./authHelperFunctions')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('./secretsConfig')

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, secrets.jwtSecret, options);
}


router.post('/register', (req, res) => {
  const adminInfo = req.body;

  if (adminInfo.firstName && adminInfo.lastName && adminInfo.username && adminInfo.password) {
    const hash = bcrypt.hashSync(adminInfo.password, 10)
    adminInfo.password = hash
    helpers.add(adminInfo)
      .then( user => {
        res.status(201).json({message: `Successfully registered user with username: ${user[0].username}`})
      })
      .catch( err => {
        res.status(500).json({errorMessage: 'There is a problem with the server!', err})
      })
  } else {
    res.status(401).json({message: 'Missing or invalid registration information'})
  }
})

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  if (username && password) {
    helpers.findByFilter({username}).first()
      .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({message: 'Log in Successful!', token})
        } else {
          res.status(400).json({message: 'Invalid login credentials!'})
        }
      })
      .catch( err => {
        res.status(500).json(err)
      })
  } else {
    res.status(400).json({message: 'Missing login credentials!'})
  }
})

router.get('/', (req, res) => {
  helpers.find()
    .then( users => res.status(200).json(users))
    .catch(err => res.status(500).json({message: 'There was an error with the server'}))
})

router.get('/:id', (req, res) => {
  const {id} = req.params;

  helpers.findByID(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({message: "There was an error with the server"}))
})

router.delete('/delete/:id', (req, res) => {
  const {id} = req.params;

  helpers.deleteByID(id)
    .then( result => res.status(200).json({message: 'Deleted!', id: result}))
    .catch(err => res.status(500).json({message: 'There is an error with the server'}))
  })

router.put('/modify/:id', (req, res) => {
  const {id} = req.params;
  const usernameUpdate = req.body.usernameUpdate;
  const passwordUpdate = req.body.passwordUpdate;
  const firstNameUpdate = req.body.firstNameUpdate;
  const lastNameUpdate = req.body.lastNameUpdate;

  helpers.modify(id, usernameUpdate, passwordUpdate, firstNameUpdate, lastNameUpdate)
    .then( result => res.status(200).json(result))
    .catch(err => res.status(500).json({message: 'Something is wrong with the server'}))
})

module.exports = router
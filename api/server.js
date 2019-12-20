const express = require('express')
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('../data/dbConfig')
const authRouter = require('../auth/authRoute')

server.use(morgan(), helmet(), cors(), express.json())

server.get('/', (req, res) => {
  db('acceptedStories')
  .then( admins => {
    res.status(200).json(admins)
  })
})

server.use('/auth', authRouter)

module.exports = server
const express = require('express')
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('../data/dbConfig')
const authRouter = require('../auth/authRoute')
const acceptedStoriesRouter = require('../stories/acceptedStories')

server.use(morgan(), helmet(), cors(), express.json())

server.use('/auth', authRouter);
server.use('/acceptedStories', acceptedStoriesRouter);
// server.use('./pendingStories', pendingStoriesRouter)

module.exports = server
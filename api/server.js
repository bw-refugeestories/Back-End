const express = require('express')
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

server.get('/', (req, res) => {
  res.status(200).json({message: "You're in!"})
})

module.exports = server
const db = require('../data/dbConfig')

function find() {
  return db('acceptedStories')
}

module.exports = {find}
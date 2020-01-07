const db = require('../data/dbConfig')

function find() {
  return db('acceptedStories')
}

function findByID(id) {
  return db('acceptedStories').where({id})
}

function findByName(storyName) {
  return db('acceptedStories').where({storyName})
}

module.exports = {
  find,
  findByID,
  findByName
}
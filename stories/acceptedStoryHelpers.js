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

function deleteByID(id) {
  return db('acceptedStories').where({id}).del()
}

module.exports = {
  find,
  findByID,
  findByName,
  deleteByID
}
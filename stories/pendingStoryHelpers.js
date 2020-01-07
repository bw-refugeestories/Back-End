const db = require('../data/dbConfig');

function add(info) {
  return db('pendingStories').insert(info)
}

function find(info) {
  return db('pendingStories')
}

function deleteByID(id) {
  return db('pendingStories').where({id}).del()
}

function findByID(id) {
  return db('pendingStories').where({id}).select('storyName', 'storyContent', 'storyImg')
}

function approve(id) {
  findByID(id)
    .then(story => {
      return db('acceptedStories').insert(story[0])
    })
}
module.exports = {
  add,
  deleteByID,
  findByID,
  approve,
  find
}
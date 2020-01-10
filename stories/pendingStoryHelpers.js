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
  return findByID(id)
    .then(story => {
      return db('acceptedStories').returning('id').insert(story[0])
    })
}

function modify(id) {
  return db('pendingStories').where({id}).update()
}
module.exports = {
  add,
  deleteByID,
  findByID,
  approve,
  find
}
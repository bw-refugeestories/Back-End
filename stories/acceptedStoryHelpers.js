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
  return db('acceptedStories').where({id}).del().returning('id')
}

function modify(id, contentUpdate, nameUpdate, imageUpdate) {
  return db('acceptedStories').where({id}).update({storyName: nameUpdate, storyContent: contentUpdate, storyImg: imageUpdate}, ['storyName', 'storyContent', 'id'])
}

module.exports = {
  find,
  findByID,
  findByName,
  deleteByID,
  modify
}
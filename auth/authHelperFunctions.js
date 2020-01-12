const db = require('../data/dbConfig');

function add(info) {
  return db('admins').insert(info, 'id')
    .then( (ids) => {
      const [id] = ids;
      return findByID(id)
    })
}

function find() {
  return db('admins').select('firstName', 'lastName', 'id', 'username')
}

function findByFilter(filter) {
  return db('admins').select('username', 'password').where(filter)
}

function findByID(id) {
  return db('admins').select('username', 'id').where({id})
}

function deleteByID(id) {
  return db('admins').where({id}).del().returning('id')
}

function modify(id, usernameUpdate, passwordUpdate, firstNameUpdate, lastNameUpdate) {
  return db('admins').where({id}).update({username: usernameUpdate, password: passwordUpdate, firstName: firstNameUpdate, lastName: lastNameUpdate}, ['id', 'username', 'firstName', 'lastName', 'password'])
}

module.exports = {
  add,
  find,
  findByID,
  findByFilter,
  deleteByID,
  modify
}
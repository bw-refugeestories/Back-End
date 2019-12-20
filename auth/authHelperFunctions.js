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

module.exports = {
  add,
  find,
  findByID,
  findByFilter
}
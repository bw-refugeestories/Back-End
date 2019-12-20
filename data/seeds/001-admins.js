const bcrypt = require('bcryptjs')
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admins').del()
    .then(function () {
      // Inserts seed entries
      return knex('admins').insert([
        {id: 1, firstName: 'Joe', lastName: 'Smith', username: 'jsmith123', password: bcrypt.hashSync('12345', 10)},
        {id: 2, firstName: 'Jane', lastName: 'Doe', username: 'jdoe123', password: bcrypt.hashSync('12345', 10)},
        {id: 3, firstName: 'Nick', lastName: 'Hansen', username: 'nhansen123', password: bcrypt.hashSync('12345', 10)}
      ]);
    });
};

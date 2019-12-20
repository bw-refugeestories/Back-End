const knex = require('knex');

const knexConfig = require('../knexfile');

const DBEnv = process.env.DB_ENV || 'development'

module.exports = knex(knexConfig[DBEnv]);
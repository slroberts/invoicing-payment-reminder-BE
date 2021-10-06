const knex = require('knex');

const knexfile = require('../knexfile.js');

const { DATABASE_ENV } = process.env;

const environment = DATABASE_ENV || 'development';

module.exports = knex(knexfile[environment]);

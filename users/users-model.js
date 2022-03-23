const db = require('../database/db-config.js');

module.exports = {
  add,
  getAll,
  findBy,
  findById,
  remove,
};

async function add(user) {
  const [id] = await db('users').insert(user, 'id');
  return db('users').where({ id }).first();
}

function getAll() {
  return db('users');
}

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
  return db('users').where({ id }).first();
}

function remove(id) {
  return db('users').where({ id }).del();
}

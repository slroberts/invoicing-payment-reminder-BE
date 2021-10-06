const db = require('../database/db-config.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
};

async function add(user) {
  const [id] = await db('users').insert(user, 'id');
  return db('users').where({ id }).first();
}

function find() {
  return db('users');
}

function findBy(user) {
  return db('users').where(user);
}

function findById(id) {
  return db('users').where({ id }).first();
}

function remove(id) {
  return db('users').where({ id }).del();
}

const db = require('../database/db-config');

module.exports = {
  add,
  find,
  findById,
  update,
  remove,
};

async function add(client) {
  const [id] = await db('clients').insert(client, 'id');
  return db('client').where({ id }).first();
}

function find() {
  return db('clients').join('users', 'clients.user_id', '=', 'users.id');
}

function findById(id) {
  return db('clients')
    .join('users', 'clients.user_id', '=', 'users.id')
    .where('clients.user_id', id)
    .select('client_name', 'client_email', 'client_number', 'user_id');
}

function update(changes, id) {
  return db('clients').where({ id }).update(changes);
}

async function remove(id) {
  return db('clients').where({ id }).del();
}

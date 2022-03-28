const db = require('../database/db-config');

module.exports = {
  findClientsByUserId,
  addClient,
  findClientById,
  updateClient,
  removeClient,
};

async function findClientsByUserId(id) {
  const clients = await db('clients').where({ user_id: id });
  return clients;
}

async function addClient(client) {
  const [id] = await db('clients').insert(client, 'id');
  return db('clients').where({ id }).first();
}

async function findClientById(id) {
  const client = await db('clients').where({ id }).first();
  return client;
}

function updateClient(changes, id) {
  return db('clients').where({ id }).update(changes);
}

function removeClient(id) {
  return db('clients').where({ id }).del();
}

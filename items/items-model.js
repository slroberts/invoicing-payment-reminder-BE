const db = require('../database/db-config');

module.exports = {
  findItemsByClientId,
  addItem,
  findItemById,
  updateItem,
  removeItem,
};

async function findItemsByClientId(id) {
  const items = await db('items').where({ client_id: id });
  return items;
}

async function addItem(item) {
  const [id] = await db('items').insert(item, 'id');
  return db('items').where({ id }).first();
}

async function findItemById(id) {
  const item = await db('items').where({ id }).first();
  return item;
}

function updateItem(changes, id) {
  return db('items').where({ id }).update(changes);
}

function removeItem(id) {
  return db('items').where({ id }).del();
}

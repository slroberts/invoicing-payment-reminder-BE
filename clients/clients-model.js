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

exports.up = function (knex) {
  return knex.schema.createTable('items', (tbl) => {
    tbl.increments();
    tbl.string('name').notNullable();
    tbl.float('rate').notNullable();
    tbl.integer('hours').notNullable();
    tbl
      .integer('client_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('clients')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('items');
};

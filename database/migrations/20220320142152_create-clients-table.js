exports.up = function (knex) {
  return knex.schema.createTable('clients', (tbl) => {
    tbl.increments();
    tbl.string('name').notNullable();
    tbl.string('email').notNullable();
    tbl.string('phone').notNullable();
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('clients');
};

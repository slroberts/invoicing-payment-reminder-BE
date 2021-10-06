exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.string('email', 255).notNullable().index();
      table.string('password', 255).notNullable();
    })
    .createTable('clients', function (table) {
      table.increments('id');
      table.string('client_name', 255).notNullable();
      table.string('client_email', 255).notNullable();
      table.string('client_number', 255).notNullable();
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('items', function (table) {
      table.increments('id');
      table.string('item', 255).notNullable();
      table.decimal('rate').unsigned().notNullable();
      table.integer('hours').unsigned().notNullable();
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('client_id')
        .references('id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('items').dropTable('users').dropTable('clients');
};

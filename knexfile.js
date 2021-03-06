// Update with your config settings.
require('dotenv').config();

const { DATABASE_URL } = process.env;

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    connection: {
      filename: './database/auth.db3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys= ON', done);
      },
    },
  },

  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    connection: {
      filename: './database/auth.db3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys= ON', done);
      },
    },
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
};

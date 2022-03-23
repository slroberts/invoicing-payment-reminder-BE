exports.seed = function (knex) {
  return knex('users').insert([
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'test1234',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'janedoe@test.com',
      password: 'test1234',
    },
  ]);
};

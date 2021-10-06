exports.seed = function (knex) {
  // Inserts seed entries
  return knex('clients').insert([
    {
      id: 1,
      client_name: 'John Doe',
      client_email: 'johndoe@test.com',
      client_number: '111111111',
      user_id: 1,
    },
    {
      id: 2,
      client_name: 'Jane Doe',
      client_email: 'janedoe@test.com',
      client_number: '3323454567',
      user_id: 1,
    },
    {
      id: 3,
      client_name: 'Nobody Doe',
      client_email: 'nobodydoe@test.com',
      client_number: '8900987765',
      user_id: 2,
    },
    {
      id: 4,
      client_name: 'John Doe',
      client_email: 'johndoe@test.com',
      client_number: '111111111',
      user_id: 2,
    },
  ]);
};

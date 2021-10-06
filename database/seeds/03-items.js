exports.seed = function (knex) {
  // Inserts seed entries
  return knex('items').insert([
    {
      id: 1,
      item: 'Web Design',
      rate: 30.0,
      hours: 4,
      user_id: 1,
      client_id: 1,
    },
    {
      id: 2,
      item: 'Photography',
      rate: 150.0,
      hours: 1,
      user_id: 2,
      client_id: 2,
    },
  ]);
};

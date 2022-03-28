exports.seed = function (knex) {
  return knex('items').insert([
    {
      id: 1,
      name: 'Work Shit',
      rate: 44.55,
      hours: 4,
      client_id: 1,
    },
    {
      id: 2,
      name: 'More Work Shit',
      rate: 33.18,
      hours: 6,
      client_id: 1,
    },
  ]);
};

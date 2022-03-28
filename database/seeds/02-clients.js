exports.seed = function (knex) {
  return knex('clients').insert([
    {
      id: 1,
      name: 'Test Company',
      email: 'test@company.com',
      phone: '212-212-2211',
      user_id: 1,
    },
    {
      id: 2,
      name: 'Company',
      email: 't@company.com',
      phone: '333-212-2211',
      user_id: 1,
    },
    {
      id: 3,
      name: 'Test Company',
      email: 'test@company.com',
      phone: '212-212-2211',
      user_id: 2,
    },
    {
      id: 4,
      name: 'Test Company',
      email: 'test@company.com',
      phone: '212-212-2211',
      user_id: 2,
    },
  ]);
};


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('customer').del()
    .then(function () {
      // Inserts seed entries
      return knex('customer').insert([{
          id: 1,
          monthlyBill: '2500',
          email: 'test@test.com',
          fullName: 'Test Name',
          phone: '1234567890',
          address: 'Test Address',
          dailyTrip: '15',
          mpg: '77',
          year: '2017',
          make: "Test Make",
          model: "Test Model"
      },
      ]);
    });
};

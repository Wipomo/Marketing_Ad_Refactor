
exports.up = function(knex, Promise) {
  return knex.schema.createTable('customer', (table) => {
      table.increments();
      table.text('monthlyBill');
      table.text('email');
      table.text('fullName');
      table.text('phone');
      table.text('address');
      table.text('dailyTrip');
      table.text('mpg');
      table.text('year');
      table.text('make');
      table.text('model');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('customer')
};


exports.up = function(knex, Promise) {
  return knex.schema.createTable('customer', (table) => {
      table.increments();
      table.text('email');
      table.text('fullName');
      table.float('phone');
      table.text('address');
      table.float('dailyTrip');
      table.float('mpg');
      table.float('year');
      table.text('make');
      table.text('model');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('customer')
};

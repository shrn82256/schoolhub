exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("schools", table => {
      table.increments("pid").primary();
      table.string("id").unique();
      table.string("name");
      table.string("thumb");
      table.string("banner");
      table.string("board");
      table.string("medium");
      table.string("gender");
      table.specificType("facilities", "text[]");
      table.string("about", 5000);
      table.string("address", 3000);
      table.specificType("contact", "text[]");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("schools")]);
};

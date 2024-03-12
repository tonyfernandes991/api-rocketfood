exports.up = (knex) =>
  knex.schema.createTable("orders", (table) => {
    table.increments("id");
    table.integer("products_id").references("id").inTable("products").onDelete("CASCADE");
    table.integer("users_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.createTable("orders");

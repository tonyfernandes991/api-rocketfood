exports.up = (knex) =>
  knex.schema.createTable("products", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("image");
    table.text("category").notNullable();
    table.decimal("price", 8, 2).notNullable();
    table.text("description").notNullable();
    table.integer("users_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.createTable("products");

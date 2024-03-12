const knex = require("../database/knex/index");

class ordersController {
  async create(request, response) {
    const { id } = request.params;
    const users_id = request.user.id;

    const products = await knex("products").where({ id }).first();
    await knex("orders").insert({
      products_id: products.id,
      users_id
    });

    return response.json();
  }

  async index(request, response) {
    const users_id = request.user.id;

    const orders = await knex("orders").where({ users_id });

    return response.json({ orders });
  }
}

module.exports = ordersController;

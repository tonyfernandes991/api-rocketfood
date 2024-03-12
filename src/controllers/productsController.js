const knex = require("../database/knex/index");
const DiskStorage = require("../providers/DiskStorage");

class productsController {
  async create(request, response) {
    try {
      const { name, category, price, description } = request.body;
      console.log(request.body)
      const users_id = request.user.id;
      const ingredients = JSON.parse(request.body.ingredients); // Convertendo a string para um array
      const productImage = request.file ? request.file.filename : null;

      const diskStorage = new DiskStorage();
      const filename = productImage
        ? await diskStorage.saveFile(productImage)
        : null;

      const imageValue = filename || null;

      const productData = {
        name,
        image: imageValue,
        category,
        price,
        description,
        users_id,
      };

      const [productId] = await knex("products").insert(productData);

      const ingredientsInsert = ingredients.map((name) => ({
        name,
        products_id: productId,
        users_id,
      }));

      if (ingredientsInsert.length > 0) {
        await knex("ingredients").insert(ingredientsInsert);
      }

      return response.json();
    } catch (error) {
      console.error("Erro no banco de dados:", error);
      return response.status(500).json({ erro: "Erro interno do servidor" });
    }
  }

  async delete(request, response) {
    const { id } = request.params;
    const diskStorage = new DiskStorage();

    const [product] = await knex("products").where({ id });
    await diskStorage.deleteFile(product.image);

    await knex("products").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { id } = request.params;

    const products = await knex("products").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ products_id: id })
      .orderBy("name");

    return response.json({ ...products, ingredients });
  }

  async show(request, response) {
    try {
      const { name, ingredients } = request.query;
      let products;

      if (!name && !ingredients) {
        products = await knex("products").select([
          "id",
          "name",
          "image",
          "category",
          "price",
          "description",
          "users_id",
        ]);
      } else {
        if (ingredients) {
          const filterIngredients = ingredients
            .split(",")
            .map((ingredient) => ingredient.trim());

          // Consulta de produtos com base em ingredientes
          products = await knex("ingredients")
            .distinct()
            .select([
              "products.id",
              "products.name",
              "products.image",
              "products.category",
              "products.price",
              "products.description",
              "products.users_id",
            ])
            .whereLike("products.name", `%${name}%`)
            .whereLike("ingredients.name", `%${filterIngredients}%`)
            .innerJoin("products", "products.id", "products_id");
        } else {
          // Consulta de produtos com base apenas no nome
          products = await knex("products")
            .select([
              "id",
              "name",
              "image",
              "category",
              "price",
              "description",
              "users_id",
            ])
            .whereLike("name", `%${name}%`);
        }
      }
      return response.json({ products });
    } catch (error) {
      console.error("Erro na consulta:", error.message);
      return response
        .status(500)
        .json({ error: "Erro na consulta ao banco de dados" });
    }
  }

  async update(request, response) {
    const { name, image, category, ingredients, price, description } =
      request.body;
    const { id } = request.params;

    const products = await knex("products").where({ id }).first();

    // Verificar se há uma nova imagem na requisição
    if (request.file) {
      const diskStorage = new DiskStorage();
      const filename = await diskStorage.saveFile(request.file.filename);

      // Excluir a imagem antiga apenas se uma nova imagem for enviada
      await diskStorage.deleteFile(products.image);

      // Atualizar o caminho da nova imagem no objeto 'products'
      products.image = filename;
    }

    products.name = name || products.name;
    products.category = category || products.category;
    products.price = price || products.price;
    products.description = description || products.description;

    // Ajuste na lógica para garantir que ingredients seja sempre um array
    const ingredientsArray = ingredients ? JSON.parse(ingredients) : [];

    const ingredientsInsert = ingredientsArray.map((ingredient) => {
      return {
        name: ingredient,
        products_id: products.id,
        users_id: products.users_id,
      };
    });

    // Remover os ingredientes antigos
    await knex("ingredients").where({ products_id: id }).delete();

    // Inserir os novos ingredientes
    await knex("ingredients").insert(ingredientsInsert);

    // Atualizar o produto no banco de dados
    await knex("products").where({ id }).update(products);

    return response.status(200).json();
  }
}

module.exports = productsController;

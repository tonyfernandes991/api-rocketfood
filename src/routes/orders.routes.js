const { Router } = require("express");
const OrdersController = require("../controllers/ordersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ordersRoutes = Router();

const ordersController = new OrdersController();
ordersRoutes.use(ensureAuthenticated);

ordersRoutes.post("/:id", ordersController.create);
ordersRoutes.get("/", ordersController.index);

module.exports = ordersRoutes;

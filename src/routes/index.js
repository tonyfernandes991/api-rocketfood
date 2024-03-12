const { Router } = require("express");
const express = require("express");
const path = require("path");

const usersRouter = require("./users.routes");
const productsRouter = require("./products.routes");
const ordersRouter = require("./orders.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/products", productsRouter);
routes.use("/orders", ordersRouter);
routes.use("/sessions", sessionsRouter);

const uploadsPath = path.resolve(__dirname, "..", "..", "tmp", "uploads");
routes.use("/files", express.static(uploadsPath));

module.exports = routes;

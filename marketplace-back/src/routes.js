const express = require("express");

const routes = express.Router();

const authMiddleware = require("./app/middlewares/auth");
const authorizationMiddleware = require("./app/middlewares/authorization");

const controllers = require("./app/controllers");

routes.post("/users",
  authorizationMiddleware,
  controllers.UserController.store);

routes.post("/sessions", controllers.SessionController.store);

routes.use(authMiddleware);

routes.get("/ads", controllers.AdController.index); //controller do anúncio--index
routes.get("/ads/:id", controllers.AdController.show); //controller do anúncio--show
routes.post("/ads", controllers.AdController.store); //controller do anúncio--store
routes.put("/ads/:id", controllers.AdController.update); //controller do anúncio--update
routes.delete("/ads/:id", controllers.AdController.destroy);//controller do anúncio--destroy

module.exports = routes;

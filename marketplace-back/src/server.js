const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

class App {
  constructor() {
    this.express = express(); //uso do express
    this.express.use(cors()); //uso do cors
    this.isDev = process.env.NODE_ENV !== "production";

    this.database(); //banco de dados
    this.middlewares(); //middlewares 
    this.routes(); //rotas
  }

  database() {
    //conexão com mongoose
    mongoose.connect("mongodb://localhost:27017/marketdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  }

  middlewares() {
    //uso de express
    this.express.use(express.json());
  }

  routes() {
    //uso de express
    this.express.use(require("./routes"));
  }
}

module.exports = new App().express;

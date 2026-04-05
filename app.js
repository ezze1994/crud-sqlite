const express = require("express");
const cors = require("cors");

const productoRoutes = require("./routes/producto.routes");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/productos", productoRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
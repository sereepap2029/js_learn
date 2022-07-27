const _ = require("lodash");
const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");
const express = require("express");
const ejs = require("ejs");
const morgan = require("morgan");
const session = require("express-session");
const Knex = require("knex");
const KnexSessionStore = require("connect-session-knex")(session);
require("dotenv").config();

const dataJs = require("./contents/data.js");
const logger = require("./logger.js");
const routeProduct = require("./routes/product.js");
const routeAuth = require("./routes/auth.js");
const routeProductApi = require("./routes/product-api.js");

const app = express();
//setup views EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//setup static middleware
app.use(
  "/css",
  express.static(path.resolve("node_modules", "bootstrap", "dist", "css"))
);
app.use(
  "/js",
  express.static(path.resolve("node_modules", "bootstrap", "dist", "js"))
);
app.use("/js", express.static(path.resolve("node_modules", "jquery", "dist")));
app.use("/", express.static(path.resolve("public")));
app.use("/css", express.static(path.resolve("css")));
app.use("/js", express.static(path.resolve("js")));
app.use("/img", express.static(path.resolve("img")));

//app.use("/", morgan("tiny"));
app.use("/", express.urlencoded({ extended: false }));
app.use("/", express.json());
//app.use("/",[authorize,logger]);
const knex = Knex({
  client: "mysql",
  connection: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
  },
});
sessionStoreOptions = {
  knex: knex,
  createtable :true
};
const store = new KnexSessionStore(sessionStoreOptions);
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.get("/", function (req, res) {
  res.sendFile(path.resolve("contents", "index.html"));
});

app.use("/api/product", routeProductApi);
app.use("/product", routeProduct);
app.use("/login", routeAuth);

app.get("/api/v1/query", function (req, res) {
  var { search, limit } = req.query;
  let sortedProducts = [...dataJs.products];
  //console.log(sortedProducts);

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.includes(search);
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    return res.status(200).send("no Product match");
  }
  return res.json(sortedProducts);
});

app.all("*", function (req, res) {
  res.status(404).send("not Found");
});

app.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});

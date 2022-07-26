const _ = require("lodash");
const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const dataJs = require("./contents/data.js");
const app = express();
const logger = require("./logger.js");
const routeProduct= require("./routes/product.js");
const routeAuth= require("./routes/auth.js");
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
//app.use("/",[authorize,logger]);




app.get("/", function (req, res) {
  res.sendFile(path.resolve("contents", "index.html"));
});

app.use("/api/product", routeProduct);
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

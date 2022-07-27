const dataJs = require("../contents/data.js");
const path = require("path");
var exp = {};
exp.getProducts = (req, res) => {
  var newProducts = dataJs.products.map((product) => {
    var { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
};

exp.getProduct = (req, res) => {
  var newProducts = dataJs.products.find((product) => {
    return product.id == req.params.id;
  });
  if (!newProducts) {
    return res.status(404).send("Product Dose not Exist");
  } else {
    res.json(newProducts);
  }
};
exp.productDisplay = (req, res) => {
  res.render(path.resolve("views", "display"));
};

module.exports = exp;

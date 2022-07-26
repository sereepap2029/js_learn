const express = require("express");
const router = express.Router();
const conProduct=require("../controllers/product.js")

router.get("/", conProduct.getProducts);

router.get("/:id", conProduct.getProduct);

module.exports = router;
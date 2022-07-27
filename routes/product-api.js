const express = require("express");
const router = express.Router();
const conProduct=require("../controllers/product.js")
const authorize = require("../middleware/auth.js");

router.use("/", authorize);
router.get("/", conProduct.getProducts);
router.get("/:id", conProduct.getProduct);

module.exports = router;
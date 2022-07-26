const express = require("express");
const router = express.Router();
const conProduct=require("../controllers/product.js")
const authorize = require("../middleware/auth-session.js");

router.use("/", authorize);
router.get("/", conProduct.productDisplay);

module.exports = router;
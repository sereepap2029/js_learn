const express = require("express");
const router = express.Router();
const authorize = require("../authorize.js");
const auth = require("../controllers/auth.js");
router.use("/auth", authorize);

router.get("/", auth.loginPage);
router.post("/auth", auth.auth);

module.exports = router;

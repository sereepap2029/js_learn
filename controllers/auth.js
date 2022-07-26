const path = require("path");
var exp = {};
exp.loginPage = (req, res) => {
  res.sendFile(path.resolve("contents", "login.html"));
};
exp.auth = (req, res) => {
  console.log(req.body);
  res.send(`welcome ${req.body.username}`);
};

module.exports = exp;

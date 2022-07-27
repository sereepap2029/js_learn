const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const session = require('express-session');

var exp = {};
exp.loginPage = (req, res) => {
  res.render(path.resolve("views", "login"),{ name: 'Tobi' });
};
exp.auth = (req, res) => {
  console.log(req.body);
  var { username, password } = req.body;
  if (!username || !password) {
    res.status(500).send("please enter your username and password");
  }
  if (username=="atom"&&password=="atom"){
  var id = 147258369;
  var token = jwt.sign({ id, username },process.env.TOKEN_SECRET_KEY,{expiresIn:'1d'});
  req.session.usnid=id;
  res.status(200).json({msg:"correct",token:token});  
  }else{
    res.status(401).json({msg:"fail"});
  }
};

exp.logout = (req, res) => {
  req.session.destroy();
  res.render('logout');
};

module.exports = exp;

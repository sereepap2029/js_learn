const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  var authtoken = req.headers.authorization;
  if (!authtoken || !authtoken.startsWith("Bearer")) {
    return res.status(401).send({ msg: "unauthorized" });
  }
  var token = authtoken.split(" ")[1];
  //console.log("Token: " + token);
  var decoded=null;
  try{
    decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  }catch(err){
    return res.status(401).send({ msg: "verify failed" });
  }
  //console.log(decoded);
  next();
};

module.exports = authorize;

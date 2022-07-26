const http = require("http");
const _ = require("lodash");
const EventEmitter = require("events");

const server = http.createServer();
server.on("request", function (req, res) {
  console.log(req.url);
  switch (req.url) {
    case "/":
      res.write("hello world");
      res.end();
      break;
    case "/about":
      res.write("about:blank");
      res.end();
      break;
    default:
      res.write("not found");
      res.end();
  }
});
server.listen(8080, () => {
  console.log("listening on port 8080");
});

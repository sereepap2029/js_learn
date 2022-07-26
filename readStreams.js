const fs = require("fs");
const os = require("os");
const path = require("path");
const http = require("http");
const _ = require("lodash");
const EventEmitter = require("events");

function createBigfile() {
  var writepath = path.join("contents", "bigfile.txt");
  for (let i = 0; i < 10000; i++) {
    fs.writeFileSync(writepath, `here result from readFileSync: ${i} \n`, {
      flag: "a",
    });
  }
}

function runMain() {
  var readpath = path.join("contents", "bigfile.txt");
  const stream = fs.createReadStream(readpath, {
    highWaterMark: 90000,
    encoding: "utf8",
  });
  stream.on("data", function (result) {
    console.log(result);
  });
  stream.on("error", function (err) {
    console.log(err);
  });
}

function runHttp() {
  const server = http.createServer();
  server.on("request", function (req, res) {
    console.log(req.url);
    var readpath = path.join("contents", "bigfile.txt");
    const stream = fs.createReadStream(readpath, {
      highWaterMark: 90000,
      encoding: "utf8",
    });
    switch (req.url) {
      case "/":
        res.write("hello world");
        res.end();
        break;
      case "/about":
        res.write("about:blank");
        res.end();
        break;
      case "/readstreampipe":
        stream.on("open", function () {
          stream.pipe(res);
        });
        stream.on("error", function (err) {
          res.write(err);
        });
        //res.end();
        break;
      case "/readstreamdata":
        stream.on("data", function (result) {
          res.write(result);
        });
        stream.on("close", function (result) {
          res.end(result);
        });
        stream.on("error", function (err) {
          res.end(err);
        });
        //res.end();
        break;
      default:
        res.write("not found");
        res.end();
    }
  });
  server.listen(8080, () => {
    console.log("listening on port 8080");
  });
}

module.exports = { runMain, createBigfile, runHttp };

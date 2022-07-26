const fs = require("fs");
const os = require("os");
const path = require("path");

console.log("Starting");
var josPath = path.join("contents", "os.json");

var txtPath = path.join("contents", "subcon", "test.txt");
var writepath = path.join("contents", "test-writeFileAsync.txt");
var fileContent;
var readprom1 = fs.readFile(josPath, { encoding: "utf8" }, (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  fileContent = result;
  fs.writeFile(writepath, `here the json = ${fileContent}`, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Written");
  });
});

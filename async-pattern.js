const fs = require("fs");
const { result } = require("lodash");
const os = require("os");
const path = require("path");
const util = require("util");
console.log("Starting");
var josPath = path.join("contents", "os.json");

var txtPath = path.join("contents", "subcon", "test.txt");
var writepath = path.join("contents", "test-writeFileAsync.txt");
var fileContent;
function getTxt(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "utf8" }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
function writeTxt(path, contents) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, contents, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve("Written");
      }
      //console.log("Written");
    });
  });
}

async function doReadTxt() {
  try {
    console.log("Reading... josPath");
    var obj1 = await getTxt(josPath);
    console.log("Reading... txtPath");
    var obj2 = await getTxt(txtPath);
    console.log("writing... writepath");
    var write1 = await writeTxt(
      writepath,
      `here the json = ${obj1} \n here the txt :${obj2}`
    );
    console.log(write1);
  } catch (error) {
    console.log("Error: ", error);
  }
}
doReadTxt();
console.log("ready to next task");
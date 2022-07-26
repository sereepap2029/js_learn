var util = require("./util.js");
var names = require("./names.js");
var os = require("os");
var path = require("path");



var filePath = path.join('content', 'subcon', 'test.txt');
console.log(filePath);
var basename= path.basename(filePath);
console.log(basename);
var absPath = path.resolve(filePath,'content', 'subcon', 'test.txt');
console.log(absPath);

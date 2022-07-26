const fs = require('fs');
const os = require("os");
const path = require("path");
var josPath = path.join("contents", "os.json");
var jos=fs.readFileSync(josPath, 'utf8');

var txtPath = path.join("contents",'subcon', "test.txt");
var txt=fs.readFileSync(txtPath, 'utf8');

console.log(jos,txt);
var writepath = path.join("contents", "test-writeFileSync.txt");
fs.writeFileSync(writepath, `here result from readFileSync: ${txt} \n ${jos}`,{flag:"a"});

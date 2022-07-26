const _ = require("lodash");

const EventEmitter = require("events");

var customEmitter = new EventEmitter();

customEmitter.on("response",(data,data2)=>{
    console.log(`Response received ${data} : ${data2}`);
})
customEmitter.on("response",(data,data2)=>{
    console.log(`Response received v2 ${data} : ${data2}`);
})
customEmitter.emit("response","resp23onse","suc33cess");
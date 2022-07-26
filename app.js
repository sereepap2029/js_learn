const _ = require("lodash");
const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");
const express = require("express");

const app = express();
//setup static middleware
app.use('/css', express.static(path.resolve('node_modules','bootstrap','dist','css')))
app.use('/js', express.static(path.resolve('node_modules','bootstrap','dist','js')))
app.use('/js', express.static(path.resolve('node_modules','jquery','dist')))
app.use('/public', express.static(path.resolve('public')))
app.use('/css', express.static(path.resolve('css')))
app.use('/js', express.static(path.resolve('js')))
app.use('/img', express.static(path.resolve('img')))

app.get("/", function (req, res) {
    res.sendFile(path.resolve("contents", "index.html"));
});

app.get("/about", function (req, res) {
    res.sendFile(path.join(__dirname,"contents", "index.html"));
});

app.all('*', function (req, res) {
    res.status(404).send("not Found");
});

app.listen(8080,() => {
    console.log("Server running at http://localhost:8080");
});

const express = require("express");
const server = express();
const routes = require("./routes")

server.set("view engine", "ejs");

// active files statics...
server.use(express.static("public"));

// enabled access to: req.body
server.use(express.urlencoded({extended: true}));

// routes
server.use(routes);

server.listen(3000, () => console.log("rodando"));
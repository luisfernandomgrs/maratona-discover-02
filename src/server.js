const express = require("express");
const server = express();
const routes = require("./routes")
const path = require("path");

const porta = process.env.PORT || 3000;

server.set("view engine", "ejs");

//Mudar a localização da pasta views...
server.set("views", path.join(__dirname, "views"));

// active files statics...
server.use(express.static("public"));

// enabled access to: req.body
server.use(express.urlencoded({extended: true}));

// routes
server.use(routes);

// server.listen(3000, () => console.log("rodando"));
server.listen(porta, () => console.log("rodando"));
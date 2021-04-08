const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

// Quando temos apenas um item, não precisamos envolver com chaves...
module.exports = () => open({
        filename: "./database.sqlite",
        driver: sqlite3.Database
    });

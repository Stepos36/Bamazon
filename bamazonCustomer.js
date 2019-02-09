var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"bamazon",
});

connection.query("SELECT * FROM bamazon.products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
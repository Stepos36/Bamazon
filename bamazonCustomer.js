var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"bamazon",
});

connection.query("SELECT * FROM bamazon.products", function(err, res) {
  var table = new Table({
    head: ['id', 'product', 'department', 'price', 'quantity']
  , colWidths: [4, 50, 14, 8, 8]
  });
  for(i=0;i<res.length;i++){
    table.push(
      [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
    );
  }
    if (err) throw err;
    console.log(table.toString());
    connection.end();
  });
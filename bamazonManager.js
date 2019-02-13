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
var userPrompt = function() {
    inquirer.prompt([
    {
      type: 'list',
      name: 'userChoice',
      message: "Welcome to Bamazon manager menu!",
      choices: [    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product"
                ]
    },
  ]).then(function(response) {
      switch (response.userChoice) {
          case "View Products for Sale":
          forSale()
          break
          case "View Low Inventory":
          lowInventory()
          break
          case "Add to Inventory":
          addInv()
          break
          case "Add New Product":
          newProd()
          break
      }
  });
}
userPrompt()

function forSale() {
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
        });
}
function lowInventory() {}
function addInv() {}
function newProd() {}
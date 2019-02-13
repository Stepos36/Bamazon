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
      message: "\nWelcome to Bamazon manager menu!\n",
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
function lowInventory() {
    connection.query("SELECT * FROM bamazon.products WHERE stock_quantity<5", function(err, res) {
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
function addInv() {
    connection.query("SELECT * FROM bamazon.products", function(err, res) {
        var itemChoices = [];
        for(i=0;i<res.length;i++){
            itemChoices.push(res[i].product_name)
            itemChoices.push(new inquirer.Separator())
        }
        if (err) throw err;
        var restockUserPrompt = function(){
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'chooseItem',
                    message: "\nPlease, choose an item you would like to restock\n",
                    choices: itemChoices
                },
                {
                    type: 'input',
                    name: 'itemAmount',
                    message: "\nPlease, enter the amount of item you would like to restock\n"
                }
            ]).then(function(response) {
                if ((response.itemAmount==null)||(response.itemAmount=='')){
                    console.log(`\nPlease, enter a proper amount\n`);
                    restockUserPrompt()
                }
                else {
                    var itemName = response.chooseItem
                    var stock
                    var managerAdd
                    connection.query("SELECT * FROM bamazon.products WHERE product_name = ?",response.chooseItem, function(err, res) {
                        stock = res[0].stock_quantity
                        managerAdd = response.itemAmount
                        var newAmount = parseInt(stock)+parseInt(managerAdd)
                        connection.query("UPDATE bamazon.products SET ? WHERE ? ",
                        [
                            {
                                stock_quantity: newAmount
                            },
                            {
                                product_name: response.chooseItem 
                            }    
                        ], function(err, res) {
                            console.log(`\nUpdate succesful!\nYou have added ${managerAdd} of ${itemName} to the stock\n`)
                        })
                });
                }
            });   
        }
        restockUserPrompt()
})
}
function newProd() {}
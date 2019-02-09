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
    userPrompt()
  });
  
  
  
  var userPrompt = function() {
    inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: "Please, enter the ID of desired product",
    },
    {
      type: 'input',
      name: 'qty',
      message: "Please, enter quantity of product you want to buy",
    }
  ]).then(function(response) {
    connection.query("SELECT * FROM bamazon.products WHERE id=?",[response.id], function(err, res) {
      if (err) throw err;
      if (res[0].stock_quantity<response.qty){console.log('Insufficient quantity!')}
      else {
        price = parseFloat(res[0].price)
        quantity = parseInt(response.qty)
        total = (price*quantity).toFixed(2)
        console.log("You've purchased "+response.qty+' of '+res[0].product_name+'\n'+
                    'Your total is: $'+total+'\n'+
                    'Thank you! Please, come again!');
        connection.query("UPDATE bamazon.products SET ? WHERE ?",
          [
            {
              stock_quantity: (res[0].stock_quantity-response.qty)
            },
            {
              id: res[0].id
            }
          ],
          )
        connection.end()
      }
    });
  })
}


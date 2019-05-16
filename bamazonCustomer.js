var mysql = require('mysql')
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});
// *************Connects and displays items*************
// connection.connect(function(err) {
//     if (err) throw err;
//     showInventory();
//   });

//   function showInventory() {
//     connection.query("SELECT * FROM products", function(err, res) {
//       if (err) throw err;
//       console.log(res);
//     });
//   }
// *************Connects and displays items*************


  connection.connect(function(err) {
    if (err) throw err;
    showInventory();
  });

  function showInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
    });
  }
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


connection.connect(function (err) {
    if (err) throw err;
    showInventory(); //start
});


function showInventory() {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "storeGoods",
                    type: "rawlist",
                    choices: function () {

                        var pushItems = [];

                        for (var i = 0; i < results.length; i++) {
                            pushItems.push(results[i].product_name);
                        }
                        return pushItems;
                    },
                    message: "What is the id of the item you would like to purchase?"
                },
                {
                    name: "buy",
                    type: "input",
                    message: "How many would you like to buy?"
                }
            ])
            .then(function (answer) {
                var selectedItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        selectedItem = results[i];
                    }
                }

            }).catch(function (error) {
                console.log(error)
            });
    });
}
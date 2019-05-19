var mysql = require('mysql')
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});



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
                        var showItems = [];

                        for (var i = 0; i < results.length; i++) {
                            showItems.push(results[i].product_name);
                        }
                        return showItems;
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

                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_name === answer.choice) {
                        chosenItem = results[i];
                        // chosenItem = results[i].stock_quantity;

                        // console.log(chosenItem);
                    }
                }
                    evaluateStock();

                function evaluateStock() {

                if (chosenItem.stock_quantity > parseInt(answer.buy)) {

                    //  Starting changes trying to update database*******

                        // connection.connect(function(error) {
                        //     if(error) throw error;

                        //     var quantUpdate = 'UPDATE products SET ? WHERE ?';
                        //         connection.query(quantUpdate, function(error, result){
                        //             if(error) throw error;
                        //             console.log(result.newData + stock_quantity + 
                        //                 ?)
                        // }

                    // End changes****************
                    
                    console.log('\n\nEnough in stock\n');
                } else {
                    console.log('\n\nNot enough :(\n')
                }
            } showInventory();

            }).catch(function (error) {
                console.log(error)
            });
    });
}



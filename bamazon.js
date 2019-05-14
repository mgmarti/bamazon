const inquirer = require('inquirer');
const mysql = require('mysql');
require('console.table')

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'products_db'
});

connection.connect(function (err) {
    // console.log("Connected as id: " + connection.threadId);
    displayInventory();
});


//Displays Inventory
function displayInventory() {
    connection.query('SELECT * FROM products_db.products', function (error, response) {
        if (error) throw error
        console.table(response)
        promptCustomer();
    })

}



function promptCustomer() {
    inquirer
        .prompt([{
                type: 'input',
                name: 'item_id',
                message: "Select the item you would like to purchase by item id.",
            },
            {
                type: 'input',
                name: 'quantity',
                message: "How many units?",
            }

        ])
        .then(function (val) {
            let productId = val.item_id;
            let productQty = val.quantity;

            connection.query('SELECT * FROM products_db.products WHERE item_id =' + productId, function (error, response) {
                // console.log(productId);
                let product = response;
                // console.log(product);
                // console.log(product[0].stock_quantity);

                if (productQty <= product[0].stock_quantity) {
                    console.log('\n' + product[0].product_name + ' is/are in stock! Placing order!');

                    let updateStock = 'UPDATE products SET stock_quantity = ' + (product[0].stock_quantity - productQty) + ' WHERE item_id = ' + productId;
                    // console.log(updateStock);

                    connection.query(updateStock, function (error, response) {
                        if (error) throw error
                        console.log('Your total is $' + product[0].price * productQty + '\n');
                        promptCustomer2();
                    })


                } else {
                    console.log('Sorry, that item not in stock');
                    // console.log('Would you like to purchase something else? \n');
                    // promptCustomer();
                }
            })

        });
}


function promptCustomer2() {
    inquirer
        .prompt([{
                type: 'list',
                name: 'buymore',
                message: "Would you like to buy something else?",
                choices: [
                    "Yes",
                    "No"
                ]
            }

        ])
        .then(function (val) {
            let userAnswer = "Yes";

            if (userAnswer === "Yes") {
                displayInventory();
                promptCustomer();
            } else {
                connection.end();
            }

        });
}
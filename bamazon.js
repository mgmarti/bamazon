const inquirer = require('inquirer');
const mysql = require('mysql');
require('console.table')

// MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "products_db"
});

connection.connect(function (err) {
    // console.log("Connected as id: " + connection.threadId);
    displayInventory();
});


//Displays Inventory
function displayInventory() {
    connection.query("SELECT * FROM products_db.products", function (error, response) {
        if (error) throw error
        console.table(response)
        promptCustomer();
    })

}



function promptCustomer() {
    inquirer
        .prompt([
            /* Pass your questions in here */
            {
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
            // var productId = val.item_id;
            var productQty = val.quantity;
            // console.log(productQty)
            // console.log("You chose: " + productId)
            // checkInventory(productId);
            // promptQuantity();

            connection.query("SELECT * FROM products_db.products", function (error, response) {

                let product = response[0];

                if (productQty <= product.stock_quantity) {
                    console.log(product.product_name + " is in stock!")
                } else {
                    console.log('item not in stock')
                }
            })

        });
}
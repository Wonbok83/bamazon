var inquirer = require("inquirer");
var mysql = require("mysql");


var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",

    password: "root",
    database: "bamazon_DB"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    options();
})


function options() {

    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "Choose the options",
            choices: ["informations", "LowInventory", "AddInventory", "AddProduct"]
        }
    ]).then(function (answer) {
        console.log(answer.options);
        if (answer.options == "informations") {
            showAll();
        } else if (answer.options == "LowInventory") {
            lowInventory();
        } else if (answer.options == "AddInventory") {
            addInventory();
        } else if (answer.options == "AddProduct") {
            addProduct();
        }
    })
}


function showAll() {
    console.log("showAll");
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        for (var i = 0; i < data.length; i++) {


            console.log("--------------");
            console.log(" id: " + data[i].itemid + ", product name:  " + data[i].productname + ", department name:  " + data[i].departmentname + ", price:  $" + data[i].price + ", quantity:  " + data[i].stockquantity + "\n");
        }
        options()

    })


}

function lowInventory() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        console.log("-------Low Inventory below 5 -------");
        for (var i = 0; i < data.length; i++) {
            if (data[i].stockquantity < 5) {
                console.log("--------------");
                console.log(" id: " + data[i].itemid + ", product name:  " + data[i].productname + ", department name:  " + data[i].departmentname + ", price:  $" + data[i].price + ", quantity:  " + data[i].stockquantity + "\n");

            }
            else {
                console.log("\n" + data[i].productname + "  above 5");

            }
        }
        options();

    })
}

function addInventory() {
    inquirer.prompt([
        {
            name: "id",
            message: "please type  the 'ID' of the product you would like to add more? "
        },
        {

            name: "quantity",
            message: "How many units of the product you would like to add more?",

        }
    ]).then(function (answer) {
        var getQuantity;
        connection.query("SELECT stockquantity FROM products WHERE itemid = ?", [answer.id], function (err, res) {
            console.log("res:", res[0].stockquantity);
            getQuantity = parseInt(res[0].stockquantity) + parseInt(answer.quantity)

        })
        console.log("getQuant: " + getQuantity);
        console.log("id: "+answer.id);
        connection.query(
            "UPDATE products SET ? WHERE  = ?",
            [
                { stockquantity: getQuantity },

                { itemid: answer.id }

            ], function (err, res) {
                console.log("it has been updated");
                options();
            }
        );
    })
};




function addProduct() {
    inquirer.prompt([
        {
            name: "productname",
            message: "what do you want to add for product? "
        },
        {

            name: "price",
            message: "How much do you want to set up the price?",

        },
        {
            name: "departmentname",
            message: "what is the department name? "
        },
        {

            name: "quantity",
            message: "How many invetory do you want to set up?",

        }
    ]).then(function (answer) {
        console.log("inserting a new product... with" + answer.product + "\n");
        var query = connection.query(
            "INSERT INTO products SET ?",
            {
                productname: answer.productname,
                departmentname: answer.departmentname,
                price: answer.price,
                stockquantity: answer.quantity
            },
            function (err, res) {
                if (err) { console.log(err) }
                console.log("product is posted!");
                console.log(res.affectedRows + " product inserted!\n");
                options();
            }
        );
    })

};
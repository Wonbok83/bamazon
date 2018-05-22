var inquirer = require("inquirer");
var mysql = require("mysql");

var table = [];
var table1 = [];



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
    showAll();
})

var showAll = function(){
    
    connection.query("SELECT * FROM products",function(err,data){
        if (err) throw err; 
            for(i=0; i< data.length; i++){
                    table.push(data[i].itemid);
                    table1.push(data[i]);

               console.log("--------------");
               console.log(" id: "+ data[i].itemid+", product name:  "+data[i].productname+", department name:  "+ data[i].departmentname+", price:  $"+data[i].price +"\n");
            }
            ask(); 

    })

    
}



function ask() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "please type  the 'ID' of the product you would like to buy? "
        },
        {

            name: "quantity",
            type: "input",
            message: "How many units of the product you would like to buy?",

        }
    ]).then(function (answer) {
        var parsedId = parseInt(answer.id);
        var parsedId2 = parseInt(answer.quantity); //how many I want to buy
        var checkQuantity = table1[table.indexOf(parsedId)].stockquantity;  //how many in stock 

        console.log("0:  "+ parsedId);
        console.log("1:  "+table.indexOf(parsedId));
        console.log("2:  "+checkQuantity);


       

        var stockquantity1  = parsedId2; //how many I want to buy

        if(checkQuantity<parsedId2) {
            console.log("Insufficient quantity!");
        } else { 
            var checkQuantity = checkQuantity - stockquantity1;
            var query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stockquantity: checkQuantity
                    },
                    {
                        itemid: parsedId
                    }
                ]
            )
            console.log("order has been approved.");
           
            console.log("--detail--");
            console.log("Quantity:  "+parsedId2);
            console.log("price:  $"+table1[table.indexOf(parsedId)].price);
            console.log("total:  $"+(parsedId2*table1[table.indexOf(parsedId)].price));


        }

        ask();
       
    });

}
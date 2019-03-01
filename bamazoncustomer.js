

var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon_db"
  });

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    startScreen();
  });


 function startScreen() {

    inquirer.prompt({
        name: "login",
        type: "list",
        message: "Who are you logging in as?",
        choices: ["CustomerLogin", "ManagerLogin", "SupervisorLogin", "Exit"]
    }).then(function(answer){
        switch (answer.login) {

            case "CustomerLogin":
            buyProducts();
            break;

            case "ManagerLogin":
            orderProducts();
            break;

            case "SupervisorLogin":
            calculateProfits();
            break;

            case "Exit":
            runExit();
        }
        

    })

 }

 function buyProducts() {

    connection.query("SELECT * FROM products", function(err, result) {
        for ( var i = 0; i < result.length; i++){

        console.log("ID: " + result[i].id + " || Product Name: " + result[i].product_name + " || Price: $" + result[i].price)
        //id, name, price
        }
            inquirer.prompt([{
                name: "buyItem",
                type: "input",
                message: "Which product ID(from above) would you like to purchase?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
            }},
            {
                name: "quantity",
                type: "input",
                message: "How much of this product would you like to buy?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
        
            }])      
                .then(function(answer){
                        var chosenItem;
                        var chosenQuant;
                        for (var i = 0; i < result.length; i++) {
                        if (result[i].id === parseInt(answer.buyItem)) {
                            chosenItem = result[i].product_name;
                            chosenQuant = result[i].stock_quantity;
                            chosenPrice = result[i].price;
                        }}
                            
                            if (parseInt(answer.quantity) <= chosenQuant) {
                                connection.query(
                                    "UPDATE products SET ? WHERE ? ",[
                                    {
                                        stock_quantity: chosenQuant - answer.quantity
                                    },
                                    {
                                        id: answer.buyItem
                                    }
                                ])
                                console.log("The total of your order is $" + (answer.quantity * chosenPrice));
                                connection.query(
                                    "UPDATE products SET ? WHERE ?", [
                                        {
                                            product_sales: chosenPrice * answer.quantity
                                        },
                                        {
                                            id: answer.buyItem
                                        }
                                    ])
                                    console.log("Sales: $" + (answer.quantity * chosenPrice))
                                console.log("\n--------------------------------------------------------------")
                                startScreen();


                            }
                            else {
                                console.log("Insufficient quantity!");
                                console.log("We only have " + chosenQuant + " in stock right now");
                                console.log("\n------------------------------------------------------")
                                buyProducts();
                            }
                        })
                    })
                }

 function orderProducts() {

    inquirer.prompt({
        name: "menuOption",
        type: "list",
        message: "What would you like to lookup?",
        choices: [
            "View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }).then(function(answer){
            switch (answer.menuOption) {
                case "View Products For Sale":
                connection.query("SELECT * FROM products", function(err, results){
                    for ( var i = 0; i < results.length; i++){
                            if (results[i].product_sales === "null") {
                                results[i].product_sales = 0;
                           }
                        console.log("ID: " + results[i].id + " || Product Name: " + results[i].product_name + 
                        " || Price: $" + results[i].price + " || Left in Stock: " + results[i].stock_quantity + 
                        " || Sales: " + results[i].product_sales);
                       
                        
                }
                     console.log("------------------------------------------------------------------------------ ")
                     startScreen();       
            })
            break;
            case "View Low Inventory": 
            connection.query("SELECT * FROM products WHERE stock_quantity < 6", function(err, results){
                
                for (var i = 0; i < results.length; i++){

                    console.log("ID: " + results[i].id + " || Product Name: " + results[i].product_name + " || Left in Stock: " + results[i].stock_quantity);
            
             }
             console.log("------------------------------------------------------------------------------ ")
             orderProducts();
        })
        break;

        case "Add to Inventory":
        connection.query("SELECT * FROM products", function(err, results){
            for ( var i = 0; i < results.length; i++){

                console.log("ID: " + results[i].id + " || Product Name: " + results[i].product_name + 
                " || Price: $" + results[i].price + " || Left in Stock: " + results[i].stock_quantity);
        }
            inquirer.prompt([{
                name: "addToInv",
                type: "input",
                message: "What is the ID of the product would you like to order?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
        },
        {
            name: "orderCount",
                type: "input",
                message: "How much of that item would you like to order?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
        }]).then(function(response){
            var chosenItem;
            var chosenQuant;
            for (var i = 0; i < results.length; i++) {
            if (results[i].id === parseInt(response.addToInv)) {
                chosenItem = results[i].product_name;
                chosenQuant = results[i].stock_quantity;
            }}
            connection.query("UPDATE products SET ? WHERE ?", [
                {
                    stock_quantity: chosenQuant + parseInt(response.orderCount)
                },
                {
                    id: response.addToInv
                }
            ])
           console.log("There will now be " + (chosenQuant + parseInt(response.orderCount)) + " of " + chosenItem + " in the warehouse") 
           startScreen();
        })
    })
        break;
        case "Add New Product":
        inquirer.prompt([
            {
                name: "newProdName",
                type: "input",
                message: "What item would you like to add to inventory?"
            },
            {
                name: "newProdCat", 
                type: "input",
                message: "What category does this item fit in?"
            },
            {
                name: "newProdPrice",
                type: "input",
                message: "How much does this item cost?",
                validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
                }
            },
            {
                name: "newProdQuant",
                type: "input",
                message: "How many would you like to order?",
                validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
                }
            }
        ])
        .then(function(answer){
            connection.query("INSERT INTO products SET ?",
            {
                product_name: answer.newProdName,
                department_name: answer.newProdCat,
                price: parseInt(answer.newProdPrice),
                stock_quantity: parseInt(answer.newProdQuant)
            }, function(err){
                if (err) throw err;
                console.log("Those items have been ordered!")
                startScreen();
            })
        })
        break;
    }
    
})

}


function calculateProfits() {

    console.log("This new feature coming soon, check back later!");
    startScreen();
}















































































































































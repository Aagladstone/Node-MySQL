# Node-MySQL

So here in Bamazon the user can order products, see their cart and be notified if what they've ordered isn't in stock. 

So when the user longs into Bamazon they will get a screen that comes up with three options: Customer Login, Manager Login, and Supervisor Login.

![Image of Login Screen](https://github.com/Aagladstone/Node-MySQL/blob/master/Images/startscreen.PNG)

Then they will hit the enter key on the customer login, and the options for them to purchase from will appear. 

![Image of product options](https://github.com/Aagladstone/Node-MySQL/blob/master/Images/customer-start.PNG)

The user will then choose the ID of the number they would like to purchase and how many of those items they would like to purchase on the command line. If there is enough in stock of that item, the customer will see how much their basket is going to cost. 

![Image of basket price](https://github.com/Aagladstone/Node-MySQL/blob/master/Images/customer-purchase.PNG)

Once completed the app will take them back to the home page, so they can either exit or start over and order something else. 
If enough items are not available, then the customer will be notified that their order will not be able to be fulfilled. 

![Image of error notification](https://github.com/Aagladstone/Node-MySQL/blob/master/Images/insufficient-supply.PNG)

Once this message is sent the app will redirect to the purchase screen again so that they may try and purchase again, either another product or lesser quantity. 

BUT not only is this tool used for a customer, but it can also be used for a manager that is in charge of ordering the product using this same application. Once in the home screen the person in charge of order will choose "Manager Login" and they will get another screen with 4 choices. 

![Image of manager Home screen](https://github.com/Aagladstone/Node-MySQL/blob/master/Images/manager-options.PNG)

If the manager would like to see how much of each item is still in stock he/she will choose the first option, "View Products For Sale", and all this does is show what exactly is left in the warehouse, as well as how much in sales they've made on that item.

![Image of manager inventory](https://github.com/Aagladstone/Node-MySQL/blob/master/Images/manager-inventory.PNG)

If the manager would like to see just the items that are low on inventory(less than 5 left to be exact), they will choose on the manager home screen, "View Low Inventory". This will only show these items that need to be ordered, and after seeing this the app will take you back to the manager home screen as well. 

![Image of low Inventory](https://github.com/Aagladstone/Node-MySQL/blob/master/Images/manager-low-inventory.PNG)

Now if it is time to order something the next option will do the trick. The "Add to inventory" button will let the manager order a certain product by typing in that product ID, and how many they'd like to bring in. The app will then let the manager know how many he will have in stock after they order. 

![Image of order screen](https://github.com/Aagladstone/Node-MySQL/blob/master/Images/manager-order-more.PNG)

Last but not least, the most powerful feature of the app allows the manager to bring in new product, and bring in as many as they want. The application will ask for all the information about the product like name, department, the price of the new item and how many they'd like to bring in. 

![Image of manager ordering new product](https://github.com/Aagladstone/Node-MySQL/blob/master/Images/manager-add-new-item.PNG)

Once complete the customer can now see this new item on their dashboard, and are able to order as many that are in stock!

https://github.com/Aagladstone/Node-MySQL/blob/master/Images/new-inventory.PNG

Thanks for checking out my Bamazon app!


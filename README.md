# Bamazon

## Overview

Create an Amazon-like storefront with MySQL and Node.js. The app will take in orders from customers and deplete stock from the store's inventory.

## Requirements

**Node Packages**
1. MySQL
2. Inquirer

## Functionality

1. Starting Bamazon App
    
    Run node bamazon.js to start app and display list of items for sale.

    ![image of bamazon-start](/assets/images/bamazon-start.gif)  


2. Selecting an Item
    
    Enter ID of the item you would like to purchase. Then, amount of units.

    ![image of bamazon-select-item](/assets/images/bamazon-item.gif)                                                                                  

3. Buy More
    
    At the end of transaction user is prompted if they want to purchase more items. Inventory is displayed again with updated stock.

    ![image of bamazon-buy-more](/assets/images/bamazon-buymore.gif)
    
    **OR**

4. End Transaction

    If user selects no, app closes.

    ![image of bamazon-start](/assets/images/bamazon-buyend.gif)

5. Out of Stock/Insufficient quantity

    If user inputs unit amount higher than available, user receives insufficient quantity notification.

       ![image of bamazon-start](/assets/images/bamazon-end.gif)
    
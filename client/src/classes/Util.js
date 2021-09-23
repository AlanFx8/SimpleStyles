export default class Util {
    //GET TOTAL ITEMS
    //Goes through every product and gets the qty for each one
    GetTotalItems = products => {
        var totalItems = 0;
        for (let x = 0 ; x < products.length; x++){
            totalItems += parseInt(products[x].qty);
        }
        return totalItems;
    }

    //GET ITEM COST
    //Gets the cost of a product * qty
    GetItemCost = product => {
        var totalCost = this._getCostAsPennies(product);

        //Convert pennies into real price
        totalCost *= .01;
        totalCost = Number((totalCost).toFixed(2)).toString();

        //Add an extra 0 if needed
        if (totalCost.includes(".")){
            if (totalCost.split(".")[1].length === 1){
                totalCost += "0";
            }
        }

        //Finished
        return totalCost;
    }

    //GET PURCHASE PRICE
    //Gets the full price of a purchase
    GetPurchasePrice = products => {
        var totalCost = 0;

        //Loop
        for (let x = 0; x < products.length; x++){
            const total = this._getCostAsPennies(products[x]);
            totalCost += total;
        }

        //Convert pennies into real price
        totalCost *= .01;
        totalCost = Number((totalCost).toFixed(2)).toString();

        //Add an extra 0 if needed
        if (totalCost.includes(".")){
            if (totalCost.split(".")[1].length === 1){
                totalCost += "0";
            }
        }

        //Finished
        return totalCost;
    }

    //HELPERS
    _getCostAsPennies = product => {
        let price = product.discount_price || product.price;
        let values = price.toString().split(".");
        let pounds = parseInt(values[0]) * 100;
        let pennies = (values.length > 1)?parseInt(values[1]):0;

        //Caluate the total cost and round it to two places
        let total = pounds + pennies;
        total *= product.qty;

        return total;
    }
}
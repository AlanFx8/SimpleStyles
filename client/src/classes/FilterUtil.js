//Helper class to filter products
//Used by redux action
const FilterByColour = (products, value) => {
    //If Value = "Reset"...
    if (value === "reset"){
        for (let x = 0; x < products.length; x++){
            products[x].hidden_by_colour = false;
        }
        return products;
    }

    //First, hide all products
    for (let x = 0; x < products.length; x++){
        products[x].hidden_by_colour = true;
    }

    //Second, show products that match the colour
    for (let x = 0; x < products.length; x++){
        if (products[x].colour === value){
            products[x].hidden_by_colour = false;
        }
    }

    //Third, return the new list
    return products;
}

const FilterByPrice = (products, value) => {
    //First, hide all products
    for (let x = 0; x < products.length; x++){
        products[x].hidden_by_price = true;
    }

    //Second, show products that match the colour
    for (let x = 0; x < products.length; x++){
        const realPrice =
        products[x].discount_price ? products[x].discount_price : products[x].price;

        if (realPrice >= value){
            products[x].hidden_by_price = false;
        }
    }

    //Third, return the new list
    return products;
}

//Exprt
export { FilterByColour, FilterByPrice }
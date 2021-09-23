//Helper class to sort products
//Used by redux action
const SortProducts = (products, arg) => {
    switch(arg){
        case 'R': //Recommended
            products.sort((a, b) => {
                let x = a.index;
                let y = b.index;
                if (x < y) {return -1;}
                if (x > y) {return 1;}        
                return 0;
            });
            break;
        case 'T': //Top-sellers
                products.sort((a, b) => {
                    let x = a.review_score;
                    let y = b.review_score;
                    if (x < y) {return 1;}
                    if (x > y) {return -1;}        
                    return 0;
                });
                break;
        case 'Low-High':
            products.sort((a, b) => {
                let x = (a.discount_price)?a.discount_price : a.price;
                let y = (b.discount_price)?b.discount_price : b.price;
                if (x < y) {return -1;}
                if (x > y) {return 1;}        
                return 0;
            });
            break;
        case 'High-Low':
            products.sort((a, b) => {
                let x = (a.discount_price)?a.discount_price : a.price;
                let y = (b.discount_price)?b.discount_price : b.price;
                if (x < y) {return 1;}
                if (x > y) {return -1;}        
                return 0;
            });
            break;
        case 'A-Z':
            products.sort((a, b) => {
                let x = a.name.toLocaleLowerCase();
                let y = b.name.toLocaleLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}        
                return 0;
            });
            break;
        case 'Z-A':
                products.sort((a, b) => {
                    let x = a.name.toLocaleLowerCase();
                    let y = b.name.toLocaleLowerCase();
                    if (x < y) {return 1;}
                    if (x > y) {return -1;}        
                    return 0;
                });
                break;
        default:
            break;
    }

    return products;
}

//Exprt
export { SortProducts }
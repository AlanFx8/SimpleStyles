import React from 'react';

//The PriceBuilder Object
//It builds the price / discount-price for projuct-list pages and projuct pages
export default class PriceBuilder extends React.Component {
    render(){
        const { discount_price, price } = this.props;

        return(
            <div className="price-wrapper">
                {discount_price && <span className="discount-price">
                    ${discount_price}
                </span>}
                <span className={(discount_price)?'original-price':'product-price'} >
                    ${price}
                </span>
            </div>
        );
    }
}
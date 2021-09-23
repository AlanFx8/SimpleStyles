/*
Most Project List Pages (like cloths, cloths/shirts, men and women, etc.)
share the same layout, with the only difference being which redux action is called
This page acts as the inside of said pages with them acting as wrappers
*/
import React from "react";
import ProductPageSubMenu from './productPageSubMenu';
import ProductPreview from './productPreview';
import LoadingObj from './loadingObj';
import ErrorObj from './errorObj';

export default class ProductListPageContent extends React.Component {
    onSortRequest = e => {
        const { products } = this.props.reducerData;
        const { value } = e.target;
        this.props.sortAction(products, value);
    }

    onFilterRequest = (type, value) => {
        const { products } = this.props.reducerData;
        this.props.filterAction(products, type, value);
    }

    render(){
        const {loading, products, error } = this.props.reducerData;

        return (<div id="main-content-wrapper">
            { loading && <LoadingObj /> }
            
            { products && products.length > 0 && <>
                <ProductPageSubMenu
                    products = { products }
                    onSortRequest = { this.onSortRequest }
                    onFilterRequest = { this.onFilterRequest }
                />
                <div id="products-result-wrapper">
                { products.map((product) => {
                    if (product.hidden_by_colour || product.hidden_by_price)
                        return null;
                        
                    return <ProductPreview product = { product } key = { product.id } />
                })}
                </div>
            </>}

            {products && products.length === 0 && <>
                <div>Sorry, your query returned no results.</div>
            </>}
            
            { error && <ErrorObj message = { error } /> }
        </div>);
    }
}
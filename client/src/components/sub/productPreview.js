import React from 'react';
import { Link } from 'react-router-dom';
import PriceBuilder from './priceBuilder';
import RatingBuilder from './ratingBuilder';
import './css/product-preview.css';

///THE PRODUCT PREVIEW CLASS///
//Returns a product panel in a list of results//
export default class ProductPreview extends React.Component {
    render(){
        const { product } = this.props;
        return (
            <div className="product-preview">
                <ImgLinkBuilder product = { product } />
                <div className="brand">{ product.brand_name }</div>
                <div className="name">{ product.name }</div>
                <PriceBuilder price = { product.price } discount_price = { product.discount_price } />
                <RatingBuilder
                    review_score= { product.review_score }
                    review_count = { product.review_count }
                />
            </div>
        );
    }
}

///HELPERS///
const ImgLinkBuilder = product => {
    const { type,  id, name, } = product.product;
    const url = process.env.PUBLIC_URL;
    return (<div className="preview-img-wrapper"><Link to = {`/product/${id}`} >
        <img src={`${url}/img/cloths/${type}/${id}-min.jpg`} title={name} alt={name} />
    </Link></div>);
}
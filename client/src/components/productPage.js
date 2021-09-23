import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToCart } from '../redux/actions/cartActions';
import { fetchProduct } from '../redux/actions/productActions';
import PriceBuilder from './sub/priceBuilder';
import RatingBuilder from './sub/ratingBuilder';
import LoadingObj from './sub/loadingObj';
import ErrorObj from './sub/errorObj';
import BasketModel from './basketModel';
import './css/product-page.css';

///THE PRODUCT PAGE///
class ProductPage extends React.Component {
    //START//
    constructor(props){
        super(props);

        this.state = {
            qty: 1,
            qty_min: 1,
            qty_max: 20,
            openModel: false
        }
    }

    componentDidMount(){       
        this.props.fetchProduct(this.props.match.params.id);
    }

    //METHODS///
    onAddToCart = () => {
        this.props.addToCart(this.props.match.params.id, this.state.qty)
        .then(() => {
            this.setState({openModel: true});
        });
    }

    //Qty-related
    onQtyChange = e => {
        const productStock = this.props.productReducer.product.stock;
        const defaultMax = this.state.qty_max;
        const max = (productStock < defaultMax) ? productStock : defaultMax;

        let val = e.target.value;
        if (val < this.state.qty_min){
            val = this.state.qty_min;
        }
        if (val > max){
            val = max;
        }
        this.setState({qty: val});
    }

    onQtyDecrease = () => {
        if (this.state.qty > this.state.qty_min){
            this.setState({qty: parseInt(this.state.qty)-1});
        }
    }

    onQtyIncrease = () => {
        const productStock = this.props.productReducer.product.stock;
        const defaultMax = this.state.qty_max;
        const max = (productStock < defaultMax) ? productStock : defaultMax;
        if (this.state.qty < max){ //this.state.qty_max
            this.setState({qty: parseInt(this.state.qty)+1});
        }
    }

    //Checkout methods
    onCloseModel = () => {
        this.setState({openModel: false});
    }

    onGoToCart = () => {
        this.props.history.push("/cart");
    }

    //RENDER//
    render(){
        const {loading, product, error } = this.props.productReducer;

        return (<div id="main-content-wrapper">
            { loading && <LoadingObj /> }
            { product && <>
                <ProductPageContent
                    product = { product }
                    qty = { this.state.qty }
                    qty_min = { this.state.qty_min }
                    qty_max = { this.state.qty_max }
                    onAddToCart = { this.onAddToCart }
                    onQtyChange = { this.onQtyChange }
                    onQtyIncrease = { this.onQtyIncrease }
                    onQtyDecrease = { this.onQtyDecrease }
                />

                { this.state.openModel && <BasketModel
                    product = { product }
                    qty = { this.state.qty }
                    onCloseModel = { this.onCloseModel }
                    onGoToCart = { this.onGoToCart }
                /> }
            </>}
            { error && <ErrorObj message = { error } /> }
        </div>);
    }
}

//SUB-PAGES///
//The ProductPageContent - It contains the actual page
class ProductPageContent extends React.Component {
    //START//
    constructor(props){
        super(props);
        this.state = {
            productImgWrapperID: "product-img-wrapper",
            productImgID: "product-page-img"
        }
    }
    
    //EVENTS//
    onImgWrapperMouseEnter = () => {
        if (!window.matchMedia('(min-width: 50rem)').matches)
            return;

        const wrapper = document.getElementById(this.state.productImgWrapperID);
        const img = document.getElementById(this.state.productImgID);
        img.style.width = `${wrapper.clientWidth * 2}px`;
        img.style.height = `${wrapper.clientHeight * 2}px`;
    }

    onImgWrapperMouseMove = e => {
        if (!window.matchMedia('(min-width: 50rem)').matches)
        return;

        const wrapper = document.getElementById(this.state.productImgWrapperID);
        const img = document.getElementById(this.state.productImgID);
        const percentX = (e.clientX - wrapper.offsetLeft) / wrapper.clientWidth;
        const percentY = (e.clientY - wrapper.offsetTop) / wrapper.clientHeight;
        img.style.left = `-${percentX * 100}%`;
        img.style.top = `-${percentY * 100}%`;
    }

    onImgWrapperMouseExit = () => {
        const img = document.getElementById(this.state.productImgID);
        img.style.width = `100%`;
        img.style.height = '100%';
        img.style.left = 0;
        img.style.top = 0;
    }

    //RENDER//
    render(){
        const { product } = this.props;
        const url = process.env.PUBLIC_URL;
        return (<>
            <ProductPageHeader product= { product } />
            <div className="section-wrapper">
                <section className="img-section">
                    <div
                        id= {this.state.productImgWrapperID}
                        onMouseEnter= { this.onImgWrapperMouseEnter }
                        onMouseMove = { this.onImgWrapperMouseMove }
                        onMouseLeave = { this.onImgWrapperMouseExit }
                    >
                        <div id = { this.state.productImgID}>
                        <img                            
                            src={`${url}/img/cloths/${product.type}/${product.id}.jpg`}
                            alt= { product.name }
                            title= { product.name }
                        />
                        </div>
                    </div>
                </section>
                <section className="details-section">
                    <div className="name">{ product.name }</div>
                    <PriceBuilder price = { product.price } discount_price = { product.discount_price } />
                    <Link to={`/brands/${product.brand_id}`}>                    
                    <img
                        src ={ `${url}/img/layout/brands/${product.brand_id}.png` }
                        title = { product.brand_name }
                        alt ={ product.brand_name }
                    />
                    </Link>

                    <RatingBuilder
                        review_score= { product.review_score }
                        review_count = { product.review_count }
                    />

                    { product.stock === 0 && <div className="no-stock">Sorry, out of stock.</div> }
                    { product.stock > 0 && <div className="stock" >In stock!</div>}
                    { product.stock > 0 &&
                        <div className="basket-section ">
                            <div className="basket-qty-section">
                                <button
                                    type="button"
                                    onClick={this.props.onQtyDecrease}
                                    id="decrease-button"
                                >
                                    {'-'}
                                </button>
                                <input
                                    type="number"
                                    value={ this.props.qty }
                                    min={ this.props.qty_min }
                                    max={ this.props.qty_max }
                                    onChange={ this.props.onQtyChange }
                                />
                                <button
                                    type="button"
                                    onClick={this.props.onQtyIncrease}
                                    id="increase-button"
                                >
                                    {'+'}
                                </button>
                            </div>
                            <div className="basket-button-section">
                                <button
                                    type="button"
                                    className="basket-button"
                                    onClick= { this.props.onAddToCart }
                                >
                                    <FontAwesomeIcon
                                        icon={['fas', 'shopping-cart']}
                                        className="cart-icon"
                                    />
                                    <span className="basket-text">Add to basket</span>
                                </button>
                            </div>
                        </div>
                    }
                </section>
            </div>
        </>);
    }
}

//The ProductPageHeader
class ProductPageHeader extends React.Component {
    render(){
        const { product } = this.props;
        const link = (product.gender === 'm') ? "/men" : "/women";
        const type = product.type;
        const text = (product.gender === 'm') ? "MEN" : "WOMEN";

        return(
            <nav className="product-page-header">
                <Link to="/">HOME</Link>
                <span className="slash"> / </span>                
                <Link to={link}> { text } </Link>                
                <span className="slash"> / </span>                
                <Link to={link + `/${type}`}> { type } </Link>                
                <span className="slash"> / </span>                
                <span>{ product.name }</span>
            </nav>
        );
    }
}

//REDUX-RELATED//
ProductPage.propTypes = {
    fetchProduct: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    productReducer: state.productReducer
});

export default connect(mapStateToProps, { fetchProduct, addToCart })(ProductPage);
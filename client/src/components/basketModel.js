import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Util from '../classes/Util';
import './css/basket-model.css';

///THE BASKET NODEL///
class BasketModel extends React.Component {
    //START
    constructor(props){
        super(props);

        this.state = {
            util: new Util()
        }
    }

    componentDidMount(){
        window.addEventListener('keyup', this.onKeyInput, false);
    }

    componentWillUnmount(){
        window.removeEventListener('keyup', this.onKeyInput, false);
    }

    //METHODS
    onKeyInput = e => {
        if (e.keyCode === 27){
            this.props.onCloseModel();
        }
    }

    onClickEvent = e => {
        if (e.target.id === "basket-model")
            this.props.onCloseModel();
    }

    //RENDER
    render(){
        const { product } = this.props;
        const { cartItems } = this.props.cartReducer;
        const url = process.env.PUBLIC_URL;

        return (
            <div id="basket-model" onClick={ this.onClickEvent } >
                <div id="basket-model-panel">
                    
                <div className="basket-model-header">
                    <div className="basket-model-header-title">
                        <FontAwesomeIcon icon={['fas', 'shopping-cart']} className="cart-icon" />
                        <h2>Added to Your Cart</h2>
                    </div>
                    <div className="basket-model-close-btn" onClick={ this.props.onCloseModel }>
                        <FontAwesomeIcon icon={['fas', 'times']}  />
                    </div>
                </div>

                <div className="basket-model-body">
                    <div className="basket-model-body-img">
                        <img
                            src={`${url}/img/cloths/${product.type}/${product.id}-min.jpg`}
                            alt={"A preview"} title={product.name}
                        />
                    </div>
                    <div className="basket-model-body-info">
                        <h2>{product.name}</h2>
                        <span className="price">${product.discount_price || product.price}</span>
                        <span>Qty: {this.props.qty}</span>
                    </div>
                    <div className="basket-model-body-total">
                        <div>
                            Total Items in Cart: {this.state.util.GetTotalItems(cartItems)}
                        </div>
                        <div>
                            Subtotal: ${this.state.util.GetPurchasePrice(cartItems)}
                        </div>
                    </div>
                </div>

                <div className="basket-model-footer">
                    <button
                        type="button"
                        className="continue-shopping-btn"
                        onClick={ this.props.onCloseModel }
                    >
                        Continue Shoping
                    </button>
                    <button
                        type="button"
                        className="cart-checkout-btn"
                        onClick={ this.props.onGoToCart }
                    >
                        Go To Cart
                    </button>
                </div>

                </div>
            </div>
        );
    }
}

///REDUX///
BasketModel.propTypes = {
    cartReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    cartReducer: state.cartReducer
});

export default connect(mapStateToProps, {} )(BasketModel);
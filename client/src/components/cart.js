import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, emptyCart } from '../redux/actions/cartActions';
import Util from '../classes/Util';
import './css/cart.css';

///THE CART///
class Cart extends React.Component {
    //START//
    constructor(props){
        super(props);

        this.state = {
            qty_min: 1,
            qty_max: 20,
            util: new Util()
        }
    }

    //METHODS//
    onQtyChange = (product, e) => {
        if (isNaN(e.target.value))
            return;
        let val = e.target.value;
        let max = (product.stock < this.state.qty_max) ? product.stock : this.state.qty_max;

        if (val < this.state.qty_min){
            val = this.state.qty_min;
        }
        if (val > max){
            val = max;
        }

        this.props.addToCart(product.id, val);
    }

    onQtyDecrease = id => {
        const product = this.props.cartReducer.cartItems.find(x => x.id === id);
        if (!product) return;
        if (product.qty > this.state.qty_min){
            this.props.addToCart(id, parseInt(product.qty)-1);
        }
    }

    onQtyIncrease = id => {
        const product = this.props.cartReducer.cartItems.find(x => x.id === id);
        if (!product) return;
        const max = (product.stock < this.state.qty_max) ? product.stock : this.state.qty_max;
        if (product.qty < max){
            this.props.addToCart(id, parseInt(product.qty)+1);
        }
    }

    onRemoveItem = id => {
        const product = this.props.cartReducer.cartItems.find(x => x.id === id);
        if (!product) return;
        this.props.removeFromCart(product.id);
    }

    onBackRequest = () => {
        this.props.history.push("/cloths/");
    }

    onCheckoutRequest = () => {
        this.props.emptyCart();
        this.props.history.push("/checkout/");
    }

    //RENDER//
    render(){
        const { cartItems } = this.props.cartReducer;
        const products = cartItems.map((item, index) => {
            return <CartItemBuilder
                product={ item }
                index={ index }
                key={ index }
                util={ this.state.util }
                qty_min={ this.state.qty_min }
                qty_max={ this.state.qty_max }
                onQtyChange={ this.onQtyChange }
                onQtyDecrease={ this.onQtyDecrease }
                onQtyIncrease={ this.onQtyIncrease }
                onRemoveItem={ this.onRemoveItem }
            />
        });

        return(
            <div className="main-content-wrapper">
                { products.length === 0 && <p>Sorry, the cart is empty</p> }
                { products.length > 0 &&
                <div id="cart">
                    <div className="cart-header">
                        <div className="cart-header-title">
                            <FontAwesomeIcon icon={['fas', 'shopping-cart']} className="cart-icon" />
                            <h2>Shopping Cart</h2>
                        </div>
                        <div className="cart-btn-wrapper">
                            <BackBTNBuilder onBackRequest={ this.onBackRequest } />
                            <CheckoutBTNBuilder onCheckoutRequest={ this.onCheckoutRequest } />
                        </div>
                    </div>

                    <div className="cart-body">
                        <div className="purchase-headings">
                            <div>Product</div>
                            <div>Quantity</div>
                            <div>Prices</div>
                        </div>
                        <ul className="purchases">
                            {products}
                        </ul>
                    </div>

                    <div className="cart-footer">
                        <h2 className="total-order">
                            Total Order: ${ this.state.util.GetPurchasePrice(cartItems) }
                        </h2>
                        <div className="cart-btn-wrapper">
                            <BackBTNBuilder onBackRequest={ this.onBackRequest } />
                            <CheckoutBTNBuilder onCheckoutRequest={ this.onCheckoutRequest } />
                        </div>
                    </div>
                </div> }
            </div>
        );
    }
}

///SUB-CLASSES///
class CartItemBuilder extends React.Component {
    render(){
        const { product, index } = this.props;
        const { id, qty } = product;
        const url = process.env.PUBLIC_URL;

        return <li className="purchase" key={index}>
                <section className="purchase-product">
                    <img src={`${url}/img/cloths/${product.type}/${product.id}-min.jpg`}
                            alt={"A preview"} title={product.name} />
                    <div className="info">
                        <span className="name">{product.name}</span>
                    </div>
                </section>

                <section className="purchase-quantity">
                    <div className="qty-handler">
                        <button
                            type="button"
                            onClick={ () => this.props.onQtyDecrease(id) }
                            id="decrease-button"
                        >
                            {'-'}
                        </button>
                        <input
                            type="number"
                            value={ qty }
                            min={ this.props.qty_min }
                            max={ this.props.qty_max }
                            onChange={ e => this.props.onQtyChange(product, e) }
                        />
                        <button
                            type="button"
                            onClick={ () => this.props.onQtyIncrease(id) }
                            id="increase-button"
                        >
                            {'+'}
                        </button>
                    </div>
                    <div className="remove-handler">
                        <div className="remove-btn-wrapper">
                            <button
                                type="button"
                                name="removeBTN"
                                id="removeBTN"
                                onClick={() => this.props.onRemoveItem(id)}
                            >
                                Remove from cart
                            </button>
                        </div>
                    </div>
                </section>

                <section className="purchase-prices">
                    <span>
                        Each Price: ${(product.discount_price)?product.discount_price:product.price}
                    </span>
                    <span>
                        Total price: ${this.props.util.GetItemCost(product)}
                    </span>
                </section>
            </li>
    }
}

class CheckoutBTNBuilder extends React.Component {
    render(){
        return (
            <button
                className="cart-checkout-btn in-cart-page"
                type="button"
                onClick={ this.props.onCheckoutRequest }
            >
                Checkout
            </button>
        );
    }
}

class BackBTNBuilder extends React.Component {
    render(){
        return (
            <button
                className="continue-shopping-btn in-cart-page"
                type="button"
                onClick={ this.props.onBackRequest }
            >
                Continue Shopping
            </button>
        );
    }
}

///REDUX///
Cart.propTypes = {
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    emptyCart: PropTypes.func.isRequired,
    cartReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    cartReducer : state.cartReducer
});

export default connect(mapStateToProps, { addToCart, removeFromCart, emptyCart })(Cart);
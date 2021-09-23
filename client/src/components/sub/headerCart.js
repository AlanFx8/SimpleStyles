import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { emptyCart } from '../../redux/actions/cartActions';
import Util from '../../classes/Util';

class HeaderCart extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            util: new Util()
        }
    }

    render(){
        const { cartItems } = this.props.cartReducer;
        const totalItems = this.state.util.GetTotalItems(cartItems);
        const totalOrder = this.state.util.GetPurchasePrice(cartItems)

        return (<div className="header-cart">
                <Link to="/cart">
                <FontAwesomeIcon icon={['fas', 'shopping-cart']} className="cart-icon" />
                <div className="cart-header-info">
                    {cartItems.length === 0 && 
                        <p>
                            Empty <br/>
                            Cart
                        </p >
                    }
                    {cartItems.length > 0 &&
                        <p>
                            {totalItems} Item(s) <br/>
                            ${totalOrder}
                        </p>
                    }
                </div>
            </Link>
        </div>)
    }
}

///REDUX///
HeaderCart.propTypes = {
    emptyCart: PropTypes.func.isRequired,
    cartReducer: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    cartReducer : state.cartReducer
});

export default connect(mapStateToProps, { emptyCart })(HeaderCart);
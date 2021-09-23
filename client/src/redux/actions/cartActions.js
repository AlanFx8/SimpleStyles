import * as TYPES from '../types/cartTypes';
import Axios from 'axios';

const addToCart = (productId, qty) => async (dispatch, getState) => {
	try {
        const { data } = await Axios.get("/api/product/" + productId);
        dispatch({
            type: TYPES.CART_ADD_ITEM, payload: {
                id: data.id,
                name: data.name,
                type: data.type,
                price: data.price,
                discount_price: data.discount_price,
                stock: data.stock,
                qty
            }
        });
        const { cartReducer: { cartItems } } = getState();
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}
	catch (error){
		//TODO: Add an error message for the checkout model
	}
}

const removeFromCart = productId => (dispatch, getState) => {
    dispatch({type: TYPES.CART_REMOVE_ITEM, payload: productId});
    const { cartReducer: { cartItems } } = getState();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

const emptyCart = () => async dispatch => {
    localStorage.removeItem("cartItems");
    dispatch({type: TYPES.CART_EMPTY, payload: {}});
}

export { addToCart, removeFromCart, emptyCart }
import * as TYPES from '../types/cartTypes';

function cartReducer(state={cartItems: []}, action){
    switch(action.type){
        case TYPES.CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x.id === item.id);
            if (product){
                return {cartItems: state.cartItems.map(x => x.id === product.id?item: x)};
            }
            return {cartItems: [...state.cartItems, item]}
        case TYPES.CART_REMOVE_ITEM:
            return { cartItems: state.cartItems.filter(x => x.id !== action.payload) }
        case TYPES.CART_EMPTY:
            return {cartItems: []}
        default:
            return state;
    }
}

export { cartReducer }
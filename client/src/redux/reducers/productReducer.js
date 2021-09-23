import * as TYPES  from '../types/productTypes';

const productReducer = ( state = { product: null }, action) => {
    switch (action.type){
        case TYPES.PRODUCT_FETCH_REQUESTED:
            return { loading: true };
        case TYPES.PRODUCT_FETCH_SUCCESS:
            return { loading: false, product: action.payload };
        case TYPES.PRODUCT_FETCH_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { productReducer }
import * as TYPES  from '../types/clothsTypes';

const clothsReducer = ( state = { products: null }, action) => {
    switch (action.type){
        case TYPES.CLOTHS_ACTION_REQUESTED:
            return { loading: true };
        case TYPES.CLOTHS_ACTION_SUCCESS:
            return { loading: false, products: action.payload };
        case TYPES.CLOTHS_ACTION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { clothsReducer }
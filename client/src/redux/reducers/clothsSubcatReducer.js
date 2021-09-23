import * as TYPES  from '../types/clothsSubcatTypes';

const clothsSubcatReducer = ( state = { products: null }, action) => {
    switch (action.type){
        case TYPES.CLOTHS_SUBCAT_ACTION_REQUESTED:
            return { loading: true };
        case TYPES.CLOTHS_SUBCAT_ACTION_SUCCESS:
            return { loading: false, products: action.payload };
        case TYPES.CLOTHS_SUBCAT_ACTION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { clothsSubcatReducer }
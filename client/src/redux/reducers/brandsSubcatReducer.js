import * as TYPES  from '../types/brandsSubcatTypes';

const brandsSubcatReducer = ( state = { products: null }, action) => {
    switch (action.type){
        case TYPES.BRANDS_SUBCAT_ACTION_REQUESTED:
            return { loading: true };
        case TYPES.BRANDS_SUBCAT_ACTION_SUCCESS:
            return { loading: false, products: action.payload };
        case TYPES.BRANDS_SUBCAT_ACTION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { brandsSubcatReducer }
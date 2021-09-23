import * as TYPES  from '../types/womenClothsSubcatTypes';

const womenClothsSubcatReducer = ( state = { products: null }, action) => {
    switch (action.type){
        case TYPES.WOMEN_CLOTHS_SUBCAT_ACTION_REQUESTED:
            return { loading: true };
        case TYPES.WOMEN_CLOTHS_SUBCAT_ACTION_SUCCESS:
            return { loading: false, products: action.payload };
        case TYPES.WOMEN_CLOTHS_SUBCAT_ACTION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { womenClothsSubcatReducer }
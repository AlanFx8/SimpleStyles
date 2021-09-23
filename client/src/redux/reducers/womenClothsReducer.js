import * as TYPES  from '../types/womenClothsTypes';

const womenClothsReducer = ( state = { products: null }, action) => {
    switch (action.type){
        case TYPES.WOMEN_CLOTHS_ACTION_REQUESTED:
            return { loading: true };
        case TYPES.WOMEN_CLOTHS_ACTION_SUCCESS:
            return { loading: false, products: action.payload };
        case TYPES.WOMEN_CLOTHS_ACTION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { womenClothsReducer }
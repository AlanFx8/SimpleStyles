import * as TYPES  from '../types/menClothsTypes';

const menClothsReducer = ( state = { products: null }, action) => {
    switch (action.type){
        case TYPES.MEN_CLOTHS_ACTION_REQUESTED:
            return { loading: true };
        case TYPES.MEN_CLOTHS_ACTION_SUCCESS:
            return { loading: false, products: action.payload };
        case TYPES.MEN_CLOTHS_ACTION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { menClothsReducer }
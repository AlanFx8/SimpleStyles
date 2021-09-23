import * as TYPES  from '../types/searchTypes';

const searchReducer = ( state = { products: null }, action) => {
    switch (action.type){
        case TYPES.SEARCH_ACTION_REQUESTED:
            return { loading: true };
        case TYPES.SEARCH_ACTION_SUCCESS:
            return { loading: false, products: action.payload };
        case TYPES.SEARCH_ACTION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { searchReducer }
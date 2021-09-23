import * as TYPES from '../types/productTypes';
import axios from 'axios';

const fetchProduct = id => async dispatch => {
    try {
        dispatch({ type: TYPES.PRODUCT_FETCH_REQUESTED });
        const { data } = await axios.get(`/api/product/${id}`);
        console.log(data);
        if (data !== ""){
            dispatch({ type: TYPES.PRODUCT_FETCH_SUCCESS, payload: data });
        }
        else {
            dispatch({type: TYPES.PRODUCT_FETCH_FAIL, payload: `${id} could not be found.`});
        }
    }
    catch(error){
        dispatch({ type: TYPES.PRODUCT_FETCH_FAIL, payload: error.message });
    }
}

export { fetchProduct }
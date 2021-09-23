//The brandsAction is for fetching all brands
import * as TYPES from '../types/brandsTypes';
import axios from 'axios';

const fetchBrands = () => async dispatch => {
    try {
        dispatch({ type: TYPES.BRANDS_ACTION_REQUESTED });
        const { data } = await axios.get('/api/brands');
        //console.log(data);
        dispatch({ type: TYPES.BRANDS_ACTION_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: TYPES.BRANDS_ACTION_FAIL, payload: error.message });
    }
}

//Exports
export { fetchBrands }
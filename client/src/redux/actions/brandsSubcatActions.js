//The brandsSubcatAction is for fetching, sorting, and filtering all cloths of a sub-catagory
import * as TYPES from '../types/brandsSubcatTypes';
import { SortProducts } from '../../classes/SortUtil';
import { FilterByColour, FilterByPrice } from '../../classes/FilterUtil';
import axios from 'axios';

const fetchBrandsSubcat = subcat => async dispatch => {
    try {
        dispatch({ type: TYPES.BRANDS_SUBCAT_ACTION_REQUESTED });
        const { data } = await axios.get(`/api/brands/${subcat}`);
        //console.log(data);
        dispatch({ type: TYPES.BRANDS_SUBCAT_ACTION_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: TYPES.BRANDS_SUBCAT_ACTION_FAIL, payload: error.message });
    }
}

//Sort products
const sortBrandsSubcat = (products, arg) => async dispatch => {
    try {
        dispatch({type: TYPES.BRANDS_SUBCAT_ACTION_REQUESTED});
        products = SortProducts(products, arg);
        dispatch({type: TYPES.BRANDS_SUBCAT_ACTION_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: TYPES.BRANDS_SUBCAT_ACTION_FAIL, payload: error.message});
    }
}

//Filter products
const filterBrandsSubcat = (products, type, value) => async dispatch => {
    try {
        dispatch({type: TYPES.BRANDS_SUBCAT_ACTION_REQUESTED});
        products = (type === "colour") ?
        FilterByColour(products, value) : FilterByPrice(products, value);
        dispatch({type: TYPES.BRANDS_SUBCAT_ACTION_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: TYPES.BRANDS_SUBCAT_ACTION_SUCCESS, payload: error.message});
    }
}

//Exports
export { fetchBrandsSubcat, sortBrandsSubcat, filterBrandsSubcat }
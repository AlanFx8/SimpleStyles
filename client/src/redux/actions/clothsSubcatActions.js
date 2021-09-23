//The clothsAction is for fetching, sorting, and filtering all cloths of a sub-catagory
import * as TYPES from '../types/clothsSubcatTypes';
import { SortProducts } from '../../classes/SortUtil';
import { FilterByColour, FilterByPrice } from '../../classes/FilterUtil';
import axios from 'axios';

const fetchClothsSubcat = subcat => async dispatch => {
    try {
        dispatch({ type: TYPES.CLOTHS_SUBCAT_ACTION_REQUESTED });
        const { data } = await axios.get(`/api/cloths/${subcat}`);
        //console.log(data);
        dispatch({ type: TYPES.CLOTHS_SUBCAT_ACTION_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: TYPES.CLOTHS_SUBCAT_ACTION_FAIL, payload: error.message });
    }
}

//Sort products
const sortClothsSubcat = (products, arg) => async dispatch => {
    try {
        dispatch({type: TYPES.CLOTHS_SUBCAT_ACTION_REQUESTED});
        products = SortProducts(products, arg);
        dispatch({type: TYPES.CLOTHS_SUBCAT_ACTION_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: TYPES.CLOTHS_SUBCAT_ACTION_FAIL, payload: error.message});
    }
}

//Filter products
const filterClothsSubcat = (products, type, value) => async dispatch => {
    try {
        dispatch({type: TYPES.CLOTHS_SUBCAT_ACTION_REQUESTED});
        products = (type === "colour") ?
        FilterByColour(products, value) : FilterByPrice(products, value);
        dispatch({type: TYPES.CLOTHS_SUBCAT_ACTION_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: TYPES.CLOTHS_SUBCAT_ACTION_SUCCESS, payload: error.message});
    }
}

//Exports
export { fetchClothsSubcat, sortClothsSubcat, filterClothsSubcat }
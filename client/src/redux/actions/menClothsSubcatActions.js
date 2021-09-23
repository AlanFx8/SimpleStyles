//The menClothsSubcatAction is for fetching, sorting, and filtering all cloths for men of a sub-catagory
import * as TYPES from '../types/menClothsSubcatTypes';
import { SortProducts } from '../../classes/SortUtil';
import { FilterByColour, FilterByPrice } from '../../classes/FilterUtil';
import axios from 'axios';

const fetchMenClothsSubcat = subcat => async dispatch => {
    try {
        dispatch({ type: TYPES.MEN_CLOTHS_SUBCAT_ACTION_REQUESTED });
        const { data } = await axios.get(`/api/men/${subcat}`);
        //console.log(data);
        dispatch({ type: TYPES.MEN_CLOTHS_SUBCAT_ACTION_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: TYPES.MEN_CLOTHS_SUBCAT_ACTION_FAIL, payload: error.message });
    }
}

//Sort products
const sortMenClothsSubcat = (products, arg) => async dispatch => {
    try {
        dispatch({type: TYPES.MEN_CLOTHS_SUBCAT_ACTION_REQUESTED});
        products = SortProducts(products, arg);
        dispatch({type: TYPES.MEN_CLOTHS_SUBCAT_ACTION_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: TYPES.MEN_CLOTHS_SUBCAT_ACTION_FAIL, payload: error.message});
    }
}

//Filter products
const filterMenClothsSubcat = (products, type, value) => async dispatch => {
    try {
        dispatch({type: TYPES.MEN_CLOTHS_SUBCAT_ACTION_REQUESTED});
        products = (type === "colour") ?
        FilterByColour(products, value) : FilterByPrice(products, value);
        dispatch({type: TYPES.MEN_CLOTHS_SUBCAT_ACTION_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: TYPES.MEN_CLOTHS_SUBCAT_ACTION_SUCCESS, payload: error.message});
    }
}

//Exports
export { fetchMenClothsSubcat, sortMenClothsSubcat, filterMenClothsSubcat }
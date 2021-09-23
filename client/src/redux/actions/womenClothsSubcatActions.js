//The womenClothsSubcatAction is for fetching, sorting,
//and filtering all cloths for women of a sub-catagory
import * as TYPES from '../types/womenClothsSubcatTypes';
import { SortProducts } from '../../classes/SortUtil';
import { FilterByColour, FilterByPrice } from '../../classes/FilterUtil';
import axios from 'axios';

const fetchWomenClothsSubcat = subcat => async dispatch => {
    try {
        dispatch({ type: TYPES.WOMEN_CLOTHS_SUBCAT_ACTION_REQUESTED });
        const { data } = await axios.get(`/api/women/${subcat}`);
        //console.log(data);
        dispatch({ type: TYPES.WOMEN_CLOTHS_SUBCAT_ACTION_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: TYPES.WOMEN_CLOTHS_SUBCAT_ACTION_FAIL, payload: error.message });
    }
}

//Sort products
const sortWomenClothsSubcat = (products, arg) => async dispatch => {
    try {
        dispatch({type: TYPES.WOMEN_CLOTHS_SUBCAT_ACTION_REQUESTED});
        products = SortProducts(products, arg);
        dispatch({type: TYPES.WOMEN_CLOTHS_SUBCAT_ACTION_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: TYPES.WOMEN_CLOTHS_SUBCAT_ACTION_FAIL, payload: error.message});
    }
}

//Filter products
const filterWomenClothsSubcat = (products, type, value) => async dispatch => {
    try {
        dispatch({type: TYPES.WOMEN_CLOTHS_SUBCAT_ACTION_REQUESTED});
        products = (type === "colour") ?
        FilterByColour(products, value) : FilterByPrice(products, value);
        dispatch({type: TYPES.WOMEN_CLOTHS_SUBCAT_ACTION_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: TYPES.WOMEN_CLOTHS_SUBCAT_ACTION_SUCCESS, payload: error.message});
    }
}

//Exports
export { fetchWomenClothsSubcat, sortWomenClothsSubcat, filterWomenClothsSubcat }
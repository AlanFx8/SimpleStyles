//The womenClothsAction is for fetching, sorting, and filtering all cloths for women
import * as TYPES from '../types/womenClothsTypes';
import { SortProducts } from '../../classes/SortUtil';
import { FilterByColour, FilterByPrice } from '../../classes/FilterUtil';
import axios from 'axios';

const fetchWomenCloths = () => async dispatch => {
    try {
        dispatch({ type: TYPES.WOMEN_CLOTHS_ACTION_REQUESTED });
        const { data } = await axios.get('/api/women');
        //console.log(data);
        dispatch({ type: TYPES.WOMEN_CLOTHS_ACTION_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: TYPES.WOMEN_CLOTHS_ACTION_FAIL, payload: error.message });
    }
}

//Sort products
const sortWomenCloths = (products, arg) => async dispatch => {
    try {
        dispatch({type: TYPES.WOMEN_CLOTHS_ACTION_REQUESTED});
        products = SortProducts(products, arg);
        dispatch({type: TYPES.WOMEN_CLOTHS_ACTION_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: TYPES.WOMEN_CLOTHS_ACTION_FAIL, payload: error.message});
    }
}

//Filter products
const filterWomenCloths = (products, type, value) => async dispatch => {
    try {
        dispatch({type: TYPES.WOMEN_CLOTHS_ACTION_REQUESTED});
        products = (type === "colour") ?
        FilterByColour(products, value) : FilterByPrice(products, value);
        dispatch({type: TYPES.WOMEN_CLOTHS_ACTION_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: TYPES.WOMEN_CLOTHS_ACTION_SUCCESS, payload: error.message});
    }
}

//Exports
export { fetchWomenCloths, sortWomenCloths, filterWomenCloths }
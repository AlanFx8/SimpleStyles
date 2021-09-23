//The searchAction is for searches
import * as TYPES from '../types/searchTypes';
import { SortProducts } from '../../classes/SortUtil';
import { FilterByColour, FilterByPrice } from '../../classes/FilterUtil';
import axios from 'axios';

const searchProducts = query => async dispatch => {
    try {
        dispatch({ type: TYPES.SEARCH_ACTION_REQUESTED });
        const { data } = await axios.get('/api/cloths');
        const items = [];
        const queryKeywords = [];
        const regexp = /[^\s"]+|"([^"]*)"/gi;

        //Use regexp to split keywords -- including ones in quotes
        do {
            //Each call to exec returns the next regex match as an array
            var match = regexp.exec(query);
            if (match != null)
            {
                //Index 1 in the array is the captured group if it exists
                //Index 0 is the matched text, which we use if no captured group exists
                queryKeywords.push(match[1] ? match[1] : match[0]);
            }
        } while (match != null);
        //console.log(queryKeywords);
        
        //Loop over each product and check for each keyword
        for (let x = 0; x < data.length; x++){
            for (let y = 0; y < queryKeywords.length; y++){
                const currentProduct = data[x];
                const currentSearchTerm = queryKeywords[y].toLocaleLowerCase();

                if (currentProduct.name.toLocaleLowerCase().includes(currentSearchTerm)
                || currentProduct.type.toLocaleLowerCase().includes(currentSearchTerm)
                || currentProduct.brand_name.toLocaleLowerCase().includes(currentSearchTerm)){
                    const dup = items.find(x => x.id === currentProduct.id);
                    if (!dup){
                        items.push(currentProduct);
                        continue;
                    }
                }
            }
        }

        //CHeck if failed to get any results or not
        if (items.length === 0 ){
            dispatch({type: TYPES.SEARCH_ACTION_FAIL, payload: `Search for "${query}" returned no results.`});
        }
        else {
            dispatch({type: TYPES.SEARCH_ACTION_SUCCESS, payload: items});
        }
    }
    catch(error){
        dispatch({ type: TYPES.SEARCH_ACTION_FAIL, payload: error.message });
    }
}

//Sort Search Results
const sortSearchResults = (products, arg) => async dispatch => {
    try {
        dispatch({type: TYPES.SEARCH_ACTION_REQUESTED});
        products = SortProducts(products, arg);
        dispatch({type: TYPES.SEARCH_ACTION_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: TYPES.SEARCH_ACTION_FAIL, payload: error.message});
    }
}

//Filter Search Results
const filterSearchResults = (products, type, value) => async dispatch => {
    try {
        dispatch({type: TYPES.SEARCH_ACTION_REQUESTED});
        products = (type === "colour") ?
        FilterByColour(products, value) : FilterByPrice(products, value);
        dispatch({type: TYPES.SEARCH_ACTION_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: TYPES.SEARCH_ACTION_FAIL, payload: error.message});
    }
}

//Exports
export { searchProducts, sortSearchResults, filterSearchResults }
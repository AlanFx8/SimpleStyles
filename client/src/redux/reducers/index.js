import { combineReducers } from 'redux';

//Get Reducers
import { clothsReducer } from './clothsReducer';
import { clothsSubcatReducer } from './clothsSubcatReducer';
import { menClothsReducer } from './menClothsReducer';
import { menClothsSubcatReducer } from './menClothsSubcatReducer';
import { womenClothsReducer } from './womenClothsReducer';
import { womenClothsSubcatReducer } from './womenClothsSubcatReducer';
import { brandsReducer } from './brandsReducer';
import { brandsSubcatReducer } from './brandsSubcatReducer';
import { searchReducer } from './searchReducer';
import { productReducer } from './productReducer';
import { cartReducer } from './cartReducer';

//Combind Reducers
export default combineReducers({
    clothsReducer,
    clothsSubcatReducer,
    menClothsReducer,
    menClothsSubcatReducer,
    womenClothsReducer,
    womenClothsSubcatReducer,
    brandsReducer,
    brandsSubcatReducer,
    searchReducer,
    productReducer,
    cartReducer
});
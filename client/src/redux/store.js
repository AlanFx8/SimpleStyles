import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/';

//Set up store middleware and enhancers
const middleware = [thunk];
const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

//Try to load the cart from local storage
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const initialState = { cartReducer: { cartItems }};

//Build the store
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
export default store;
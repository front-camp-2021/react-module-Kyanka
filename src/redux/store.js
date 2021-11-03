import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import productsReducer from "./productsReducer";
import filtersReducer from "./filtersReducer";

const reducers = combineReducers({
    filtersRed: filtersReducer,
    productsRed: productsReducer,
});
const middleware = applyMiddleware(thunk)
let store = createStore(reducers, undefined, middleware);

export default store;
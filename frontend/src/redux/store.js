import { createStore,applyMiddleware } from "redux";
import logger from "redux-logger";
import thunkMiddleware from 'redux-thunk'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from "./root-reducer";

const middlewares =  [ thunkMiddleware,thunk ];  

export const store = createStore(rootReducer,composeWithDevTools(
    applyMiddleware(...middlewares))
);

export default store;
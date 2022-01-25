import { createStore,applyMiddleware } from "redux";
import logger from "redux-logger";
import thunkMiddleware from 'redux-thunk'
import thunk from 'redux-thunk';

import rootReducer from "./root-reducer";

const middlewares =  [ logger,thunkMiddleware,thunk ];  

export const store = createStore(rootReducer,applyMiddleware(...middlewares));

export default store;
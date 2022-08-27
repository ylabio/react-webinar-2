import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import * as reducers from './exports';
import { composeWithDevTools } from "redux-devtools-extension";

export default function createStoreRedux(services, config){
  return createStore(combineReducers(reducers), composeWithDevTools(applyMiddleware(
    thunk.withExtraArgument(services)
  )));
}
